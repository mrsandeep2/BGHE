import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, Pencil, Loader2 } from "lucide-react";
import ImageCropper from "@/components/admin/ImageCropper";

interface Slide {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  sort_order: number;
}

const empty = { title: "", subtitle: "", image: "", sort_order: 0 };

const AdminSlides = () => {
  const [items, setItems] = useState<Slide[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Slide | null>(null);
  const [form, setForm] = useState(empty);
  const { toast } = useToast();

  const fetchData = async () => {
    const { data } = await supabase.from("hero_slides").select("*").order("sort_order");
    setItems(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const openEdit = (s: Slide) => { setEditing(s); setForm(s); setOpen(true); };
  const openNew = () => { setEditing(null); setForm(empty); setOpen(true); };

  const handleSave = async () => {
    if (editing) {
      const { error } = await supabase.from("hero_slides").update(form).eq("id", editing.id);
      if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
    } else {
      const { error } = await supabase.from("hero_slides").insert(form);
      if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
    }
    toast({ title: editing ? "Updated" : "Created" });
    setOpen(false);
    fetchData();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this slide?")) return;
    await supabase.from("hero_slides").delete().eq("id", id);
    toast({ title: "Deleted" });
    fetchData();
  };

  if (loading) return <div className="flex justify-center p-12"><Loader2 className="w-8 h-8 animate-spin text-accent" /></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-heading font-bold text-foreground">Hero Slides</h1>
        <Button onClick={openNew} className="bg-accent text-accent-foreground hover:bg-accent/90"><Plus className="w-4 h-4 mr-2" />Add Slide</Button>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        {items.map(s => (
          <Card key={s.id} className="overflow-hidden">
            <div className="h-40 bg-muted relative">
              <img src={s.image} alt={s.title} className="w-full h-full object-cover" />
              <div className="absolute top-2 right-2 bg-foreground/60 text-background text-xs px-2 py-1 rounded">Order: {s.sort_order}</div>
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold text-foreground">{s.title}</h3>
              <p className="text-sm text-muted-foreground">{s.subtitle}</p>
              <div className="flex gap-2 mt-3">
                <Button size="sm" variant="outline" onClick={() => openEdit(s)}><Pencil className="w-3 h-3 mr-1" />Edit</Button>
                <Button size="sm" variant="outline" onClick={() => handleDelete(s.id)} className="text-destructive"><Trash2 className="w-3 h-3 mr-1" />Delete</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editing ? "Edit" : "Add"} Slide</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div><Label>Title</Label><Input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} /></div>
            <div><Label>Subtitle</Label><Input value={form.subtitle} onChange={e => setForm({ ...form, subtitle: e.target.value })} /></div>
            <ImageCropper value={form.image} onChange={(url) => setForm({ ...form, image: url })} folder="slides" aspectRatio={16/9} label="Image" />
            <div><Label>Sort Order</Label><Input type="number" value={form.sort_order} onChange={e => setForm({ ...form, sort_order: parseInt(e.target.value) || 0 })} /></div>
            <Button onClick={handleSave} className="w-full bg-accent text-accent-foreground hover:bg-accent/90">Save</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminSlides;
