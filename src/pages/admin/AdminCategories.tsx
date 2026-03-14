import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Loader2, FolderOpen, Search } from "lucide-react";
import { motion } from "framer-motion";

interface Category {
  id: string;
  name: string;
  description: string;
  status: string;
  created_at: string;
}

const empty = { name: "", description: "", status: "active" };

const AdminCategories = () => {
  const [items, setItems] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);
  const [form, setForm] = useState(empty);
  const [search, setSearch] = useState("");
  const { toast } = useToast();

  const fetchData = async () => {
    const { data } = await supabase.from("course_categories").select("*").order("name");
    setItems((data as Category[]) || []);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const openEdit = (c: Category) => { setEditing(c); setForm({ name: c.name, description: c.description || "", status: c.status }); setOpen(true); };
  const openNew = () => { setEditing(null); setForm(empty); setOpen(true); };

  const handleSave = async () => {
    if (!form.name.trim()) { toast({ title: "Name required", variant: "destructive" }); return; }
    if (editing) {
      const { error } = await supabase.from("course_categories").update(form).eq("id", editing.id);
      if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
    } else {
      const { error } = await supabase.from("course_categories").insert(form);
      if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
    }
    toast({ title: editing ? "Updated" : "Created" });
    setOpen(false);
    fetchData();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this category? All courses under it will lose their category link.")) return;
    const { error } = await supabase.from("course_categories").delete().eq("id", id);
    if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
    toast({ title: "Deleted" });
    fetchData();
  };

  const filtered = items.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  if (loading) return <div className="flex justify-center p-12"><Loader2 className="w-8 h-8 animate-spin text-[hsl(var(--gold))]" /></div>;

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold text-white flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
              <FolderOpen className="w-5 h-5 text-white" />
            </div>
            Course Categories
          </h1>
          <p className="text-white/50 mt-1">{items.length} categories · Manage main course categories</p>
        </div>
        <Button onClick={openNew} className="bg-gradient-to-r from-violet-500 to-purple-600 text-white hover:from-violet-600 hover:to-purple-700 shadow-lg shadow-violet-500/25">
          <Plus className="w-4 h-4 mr-2" />Add Category
        </Button>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
        <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search categories..."
          className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-violet-500/50" />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((c, i) => (
          <motion.div key={c.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 hover:border-violet-500/30 transition-all">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                <FolderOpen className="w-5 h-5 text-white" />
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${c.status === "active" ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"}`}>
                {c.status}
              </span>
            </div>
            <h3 className="font-heading font-bold text-white text-sm mb-1">{c.name}</h3>
            <p className="text-xs text-white/40 line-clamp-2 mb-3">{c.description || "No description"}</p>
            <div className="flex gap-2">
              <Button size="sm" variant="ghost" onClick={() => openEdit(c)} className="text-white/60 hover:text-white hover:bg-white/10 text-xs">
                <Pencil className="w-3 h-3 mr-1" />Edit
              </Button>
              <Button size="sm" variant="ghost" onClick={() => handleDelete(c.id)} className="text-red-400/70 hover:text-red-400 hover:bg-red-500/10 text-xs">
                <Trash2 className="w-3 h-3 mr-1" />Delete
              </Button>
            </div>
          </motion.div>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-[hsl(213,56%,12%)] border-white/10 text-white">
          <DialogHeader><DialogTitle className="text-white">{editing ? "Edit" : "Add"} Category</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div><Label className="text-white/70">Category Name</Label><Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="bg-white/5 border-white/10 text-white" placeholder="e.g. Engineering & Technology" /></div>
            <div><Label className="text-white/70">Description</Label><Textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="bg-white/5 border-white/10 text-white" placeholder="Brief description..." /></div>
            <div>
              <Label className="text-white/70">Status</Label>
              <Select value={form.status} onValueChange={v => setForm({ ...form, status: v })}>
                <SelectTrigger className="bg-white/5 border-white/10 text-white"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleSave} className="w-full bg-gradient-to-r from-violet-500 to-purple-600 text-white hover:from-violet-600 hover:to-purple-700">Save</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminCategories;
