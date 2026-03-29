import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, Loader2, Pencil } from "lucide-react";


interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
}

const categories = ["events", "campus", "seminars", "counseling"];

const AdminGallery = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title: "", category: "events", image: "" });
  const [formFile, setFormFile] = useState<File | null>(null);
  const [formPreview, setFormPreview] = useState<string | null>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [editItem, setEditItem] = useState<GalleryItem | null>(null);
  const [editForm, setEditForm] = useState({ title: "", image: "" });
  const [editFile, setEditFile] = useState<File | null>(null);
  const [editPreview, setEditPreview] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchData = async () => {
    const { data } = await supabase.from("gallery_items").select("*").order("created_at", { ascending: false });
    setItems(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  // Preview for add dialog
  const handleFormFileChange = (file: File | null) => {
    setFormFile(file);
    if (file) {
      setFormPreview(URL.createObjectURL(file));
    } else {
      setFormPreview(null);
    }
  };

  // Preview for edit dialog
  const handleEditFileChange = (file: File | null) => {
    setEditFile(file);
    if (file) {
      setEditPreview(URL.createObjectURL(file));
    } else {
      setEditPreview(null);
    }
  };

  const handleSave = async () => {
    if (!formFile) {
      toast({ title: "Error", description: "Please select an image to upload.", variant: "destructive" });
      return;
    }
    let imageUrl = form.image;
    if (formFile) {
      const fileExt = formFile.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}.${fileExt}`;
      const filePath = `gallery/${fileName}`;
      const { data, error: uploadError } = await supabase.storage.from('media').upload(filePath, formFile);
      if (uploadError) {
        toast({ title: "Upload Error", description: uploadError.message, variant: "destructive" });
        return;
      }
      const { data: urlData } = supabase.storage.from('media').getPublicUrl(filePath);
      const publicUrl = urlData.publicUrl;
      imageUrl = publicUrl;
      // Debug log
      console.log('Image uploaded. Public URL:', publicUrl);
    }
    if (!imageUrl) {
      toast({ title: "Error", description: "Image upload failed. Please try again.", variant: "destructive" });
      return;
    }
    // Always save the public URL
    const { error } = await supabase.from("gallery_items").insert({ ...form, image: imageUrl });
    if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
    toast({ title: "Added" });
    setOpen(false);
    setForm({ title: "", category: "events", image: "" });
    setFormFile(null);
    setFormPreview(null);
    fetchData();
  };


  const handleEdit = (item: GalleryItem) => {
    setEditItem(item);
    setEditForm({ title: item.title, image: item.image });
    setEditFile(null);
    setEditPreview(null);
    setEditOpen(true);
  };

  const handleEditSave = async () => {
    if (!editItem) return;
    let imageUrl = editForm.image;
    if (editFile) {
      const fileExt = editFile.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}.${fileExt}`;
      const filePath = `gallery/${fileName}`;
      const { data, error: uploadError } = await supabase.storage.from('media').upload(filePath, editFile);
      if (uploadError) {
        toast({ title: "Upload Error", description: uploadError.message, variant: "destructive" });
        return;
      }
      const { data: urlData } = supabase.storage.from('media').getPublicUrl(filePath);
      const publicUrl = urlData.publicUrl;
      imageUrl = publicUrl;
      // Debug log
      console.log('Image uploaded. Public URL:', publicUrl);
    }
    const { error } = await supabase.from("gallery_items").update({
      title: editForm.title,
      image: imageUrl
    }).eq("id", editItem.id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Updated" });
    setEditOpen(false);
    setEditItem(null);
    setEditFile(null);
    setEditPreview(null);
    fetchData();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this image?")) return;
    await supabase.from("gallery_items").delete().eq("id", id);
    toast({ title: "Deleted" });
    fetchData();
  };

  if (loading) return <div className="flex justify-center p-12"><Loader2 className="w-8 h-8 animate-spin text-accent" /></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-heading font-bold text-foreground">Gallery</h1>
        <Button onClick={() => setOpen(true)} className="bg-accent text-accent-foreground hover:bg-accent/90"><Plus className="w-4 h-4 mr-2" />Add Image</Button>
      </div>
      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map(item => (
          <div key={item.id} className="relative group rounded-xl overflow-hidden aspect-[4/3]">
            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <Button size="sm" variant="outline" onClick={() => handleEdit(item)}><Pencil className="w-4 h-4 mr-1" />Edit</Button>
              <Button size="sm" variant="destructive" onClick={() => handleDelete(item.id)}><Trash2 className="w-4 h-4 mr-1" />Delete</Button>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-foreground/50 p-2">
              <p className="text-background text-xs font-medium truncate">{item.title}</p>
              <p className="text-background/70 text-[10px] capitalize">{item.category}</p>
            </div>
          </div>
        ))}
            {/* Edit Gallery Item Dialog */}
            <Dialog open={editOpen} onOpenChange={v => { setEditOpen(v); if (!v) setEditItem(null); }}>
              <DialogContent>
                <DialogHeader><DialogTitle>Edit Gallery Image</DialogTitle></DialogHeader>
                <div className="space-y-4">
                  <div><Label>Title</Label><Input value={editForm.title} onChange={e => setEditForm({ ...editForm, title: e.target.value })} /></div>
                  <div>
                    <Label>Image</Label>
                    <Input type="file" accept="image/*" onChange={e => handleEditFileChange(e.target.files?.[0] || null)} />
                    {editPreview ? (
                      <img src={editPreview} alt="Preview" className="mt-2 w-full max-h-40 object-contain rounded" />
                    ) : editForm.image && !editFile ? (
                      <img src={editForm.image} alt="Current" className="mt-2 w-full max-h-40 object-contain rounded" />
                    ) : null}
                  </div>
                  <Button onClick={handleEditSave} className="w-full bg-accent text-accent-foreground hover:bg-accent/90">Save Changes</Button>
                </div>
              </DialogContent>
            </Dialog>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Add Gallery Image</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div><Label>Title</Label><Input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} /></div>
            <div>
              <Label>Category</Label>
              <Select value={form.category} onValueChange={v => setForm({ ...form, category: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {categories.map(c => <SelectItem key={c} value={c} className="capitalize">{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Image</Label>
              <Input type="file" accept="image/*" onChange={e => handleFormFileChange(e.target.files?.[0] || null)} />
              {formPreview ? (
                <img src={formPreview} alt="Preview" className="mt-2 w-full max-h-40 object-contain rounded" />
              ) : form.image && !formFile ? (
                <img src={form.image} alt="Current" className="mt-2 w-full max-h-40 object-contain rounded" />
              ) : null}
            </div>
            <Button onClick={handleSave} className="w-full bg-accent text-accent-foreground hover:bg-accent/90">Save</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminGallery;
