import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Loader2, GraduationCap, MapPin, Search } from "lucide-react";
import ImageCropper from "@/components/admin/ImageCropper";
import { motion } from "framer-motion";

interface University {
  id: string;
  name: string;
  location: string;
  type: string;
  courses: string[];
  image: string;
  description: string;
}

const empty: Omit<University, "id"> = { name: "", location: "", type: "Public", courses: [], image: "", description: "" };

const AdminUniversities = () => {
  const [items, setItems] = useState<University[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<University | null>(null);
  const [form, setForm] = useState(empty);
  const [coursesStr, setCoursesStr] = useState("");
  const [search, setSearch] = useState("");
  const { toast } = useToast();

  const fetchData = async () => {
    const { data } = await supabase.from("universities").select("*").order("name");
    setItems(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const openEdit = (u: University) => {
    setEditing(u);
    setForm({ name: u.name, location: u.location, type: u.type, courses: u.courses, image: u.image, description: u.description });
    setCoursesStr(u.courses.join(", "));
    setOpen(true);
  };

  const openNew = () => { setEditing(null); setForm(empty); setCoursesStr(""); setOpen(true); };

  const handleSave = async () => {
    const payload = { ...form, courses: coursesStr.split(",").map(s => s.trim()).filter(Boolean) };
    if (editing) {
      const { error } = await supabase.from("universities").update(payload).eq("id", editing.id);
      if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
    } else {
      const { error } = await supabase.from("universities").insert(payload);
      if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
    }
    toast({ title: editing ? "Updated" : "Created" });
    setOpen(false);
    fetchData();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this university?")) return;
    await supabase.from("universities").delete().eq("id", id);
    toast({ title: "Deleted" });
    fetchData();
  };

  const filtered = items.filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || u.location.toLowerCase().includes(search.toLowerCase()));

  if (loading) return <div className="flex justify-center p-12"><Loader2 className="w-8 h-8 animate-spin text-[hsl(var(--gold))]" /></div>;

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold text-white flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            Universities
          </h1>
          <p className="text-white/50 mt-1">{items.length} total universities</p>
        </div>
        <Button onClick={openNew} className="bg-gradient-to-r from-violet-500 to-purple-600 text-white hover:from-violet-600 hover:to-purple-700 shadow-lg shadow-violet-500/25">
          <Plus className="w-4 h-4 mr-2" />Add University
        </Button>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
        <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search universities..."
          className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-violet-500/50" />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((u, i) => (
          <motion.div key={u.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-violet-500/30 transition-all">
            <div className="h-40 overflow-hidden relative">
              <img src={u.image} alt={u.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.svg'; }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <span className="absolute top-3 right-3 text-xs font-bold bg-violet-500 text-white px-2.5 py-1 rounded-full">{u.type}</span>
              <div className="absolute bottom-3 left-4">
                <p className="text-white/70 text-xs flex items-center gap-1"><MapPin className="w-3 h-3" />{u.location}</p>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-heading font-bold text-white text-sm mb-2">{u.name}</h3>
              <div className="flex flex-wrap gap-1 mb-3">
                {u.courses.slice(0, 3).map(c => (
                  <span key={c} className="text-[10px] bg-white/10 text-white/70 px-2 py-0.5 rounded-full">{c}</span>
                ))}
                {u.courses.length > 3 && <span className="text-[10px] text-violet-400">+{u.courses.length - 3}</span>}
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="ghost" onClick={() => openEdit(u)} className="text-white/60 hover:text-white hover:bg-white/10 text-xs">
                  <Pencil className="w-3 h-3 mr-1" />Edit
                </Button>
                <Button size="sm" variant="ghost" onClick={() => handleDelete(u.id)} className="text-red-400/70 hover:text-red-400 hover:bg-red-500/10 text-xs">
                  <Trash2 className="w-3 h-3 mr-1" />Delete
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-[hsl(213,56%,12%)] border-white/10 text-white">
          <DialogHeader><DialogTitle className="text-white">{editing ? "Edit" : "Add"} University</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div><Label className="text-white/70">Name</Label><Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="bg-white/5 border-white/10 text-white" /></div>
            <div><Label className="text-white/70">Location</Label><Input value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} className="bg-white/5 border-white/10 text-white" /></div>
            <div><Label className="text-white/70">Type</Label><Input value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} placeholder="Public / Private" className="bg-white/5 border-white/10 text-white placeholder:text-white/30" /></div>
            <div><Label className="text-white/70">Courses (comma-separated)</Label><Input value={coursesStr} onChange={e => setCoursesStr(e.target.value)} placeholder="B.Tech, MBA, MBBS" className="bg-white/5 border-white/10 text-white placeholder:text-white/30" /></div>
            <ImageCropper value={form.image} onChange={(url) => setForm({ ...form, image: url })} folder="universities" aspectRatio={16/9} label="Image" />
            <div><Label className="text-white/70">Description</Label><Textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="bg-white/5 border-white/10 text-white" /></div>
            <Button onClick={handleSave} className="w-full bg-gradient-to-r from-violet-500 to-purple-600 text-white hover:from-violet-600 hover:to-purple-700">Save</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminUniversities;
