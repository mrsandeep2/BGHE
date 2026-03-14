import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Loader2, Building2, Search, MapPin, Phone, Mail } from "lucide-react";
import { motion } from "framer-motion";

interface Branch {
  id: string;
  city: string;
  state: string;
  address: string;
  phone: string;
  email: string;
  map_url: string | null;
}

const empty = { id: "", city: "", state: "", address: "", phone: "", email: "", map_url: "" };

const AdminBranches = () => {
  const [items, setItems] = useState<Branch[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Branch | null>(null);
  const [form, setForm] = useState(empty);
  const [search, setSearch] = useState("");
  const { toast } = useToast();

  const fetchData = async () => {
    const { data } = await supabase.from("branches").select("*").order("city");
    setItems(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const openEdit = (b: Branch) => { setEditing(b); setForm({ ...b, map_url: b.map_url || "" }); setOpen(true); };
  const openNew = () => { setEditing(null); setForm(empty); setOpen(true); };

  const handleSave = async () => {
    const payload = { ...form, map_url: form.map_url || null };
    if (editing) {
      const { id, ...rest } = payload;
      const { error } = await supabase.from("branches").update(rest).eq("id", editing.id);
      if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
    } else {
      const { error } = await supabase.from("branches").insert(payload);
      if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
    }
    toast({ title: editing ? "Updated" : "Created" });
    setOpen(false);
    fetchData();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this branch?")) return;
    await supabase.from("branches").delete().eq("id", id);
    toast({ title: "Deleted" });
    fetchData();
  };

  const filtered = items.filter(b => b.city.toLowerCase().includes(search.toLowerCase()) || b.state.toLowerCase().includes(search.toLowerCase()));

  if (loading) return <div className="flex justify-center p-12"><Loader2 className="w-8 h-8 animate-spin text-[hsl(var(--gold))]" /></div>;

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold text-white flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-600 flex items-center justify-center">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            Branches
          </h1>
          <p className="text-white/50 mt-1">{items.length} branches</p>
        </div>
        <Button onClick={openNew} className="bg-gradient-to-r from-cyan-500 to-teal-600 text-white hover:from-cyan-600 hover:to-teal-700 shadow-lg shadow-cyan-500/25">
          <Plus className="w-4 h-4 mr-2" />Add Branch
        </Button>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
        <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search branches..."
          className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-cyan-500/50" />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((b, i) => (
          <motion.div key={b.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 hover:border-cyan-500/30 transition-all">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-heading font-bold text-white text-lg">{b.city}</h3>
                <p className="text-xs text-cyan-400">{b.state}</p>
              </div>
              <span className="text-[10px] font-mono bg-white/10 text-white/50 px-2 py-0.5 rounded">{b.id}</span>
            </div>
            <div className="space-y-2 mb-4">
              <p className="text-xs text-white/50 flex items-start gap-2"><MapPin className="w-3 h-3 mt-0.5 shrink-0" />{b.address}</p>
              <p className="text-xs text-white/50 flex items-center gap-2"><Phone className="w-3 h-3 shrink-0" />{b.phone}</p>
              <p className="text-xs text-white/50 flex items-center gap-2"><Mail className="w-3 h-3 shrink-0" />{b.email}</p>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="ghost" onClick={() => openEdit(b)} className="text-white/60 hover:text-white hover:bg-white/10 text-xs">
                <Pencil className="w-3 h-3 mr-1" />Edit
              </Button>
              <Button size="sm" variant="ghost" onClick={() => handleDelete(b.id)} className="text-red-400/70 hover:text-red-400 hover:bg-red-500/10 text-xs">
                <Trash2 className="w-3 h-3 mr-1" />Delete
              </Button>
            </div>
          </motion.div>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-[hsl(213,56%,12%)] border-white/10 text-white">
          <DialogHeader><DialogTitle className="text-white">{editing ? "Edit" : "Add"} Branch</DialogTitle></DialogHeader>
          <div className="space-y-4">
            {!editing && <div><Label className="text-white/70">ID (slug)</Label><Input value={form.id} onChange={e => setForm({ ...form, id: e.target.value })} placeholder="delhi" className="bg-white/5 border-white/10 text-white placeholder:text-white/30" /></div>}
            <div><Label className="text-white/70">City</Label><Input value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} className="bg-white/5 border-white/10 text-white" /></div>
            <div><Label className="text-white/70">State</Label><Input value={form.state} onChange={e => setForm({ ...form, state: e.target.value })} className="bg-white/5 border-white/10 text-white" /></div>
            <div><Label className="text-white/70">Address</Label><Input value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} className="bg-white/5 border-white/10 text-white" /></div>
            <div><Label className="text-white/70">Phone</Label><Input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="bg-white/5 border-white/10 text-white" /></div>
            <div><Label className="text-white/70">Email</Label><Input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="bg-white/5 border-white/10 text-white" /></div>
            <div><Label className="text-white/70">Map URL (optional)</Label><Input value={form.map_url} onChange={e => setForm({ ...form, map_url: e.target.value })} className="bg-white/5 border-white/10 text-white" /></div>
            <Button onClick={handleSave} className="w-full bg-gradient-to-r from-cyan-500 to-teal-600 text-white hover:from-cyan-600 hover:to-teal-700">Save</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminBranches;
