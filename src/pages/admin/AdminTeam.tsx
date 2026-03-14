import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Loader2, Users, Search, Facebook, Instagram, Twitter } from "lucide-react";
import ImageCropper from "@/components/admin/ImageCropper";
import { motion } from "framer-motion";

interface Mentor {
  id: string;
  name: string;
  designation: string;
  bio: string;
  image: string;
  facebook_url?: string | null;
  instagram_url?: string | null;
  twitter_url?: string | null;
}

const empty = { name: "", designation: "", bio: "", image: "", facebook_url: "", instagram_url: "", twitter_url: "" };

const AdminTeam = () => {
  const [items, setItems] = useState<Mentor[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Mentor | null>(null);
  const [form, setForm] = useState(empty);
  const [search, setSearch] = useState("");
  const { toast } = useToast();

  const fetchData = async () => {
    const { data } = await supabase.from("mentors").select("*").order("name");
    setItems(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const openEdit = (m: Mentor) => { setEditing(m); setForm({ ...m, facebook_url: m.facebook_url || "", instagram_url: m.instagram_url || "", twitter_url: m.twitter_url || "" }); setOpen(true); };
  const openNew = () => { setEditing(null); setForm(empty); setOpen(true); };

  const handleSave = async () => {
    const payload = {
      name: form.name,
      designation: form.designation,
      bio: form.bio,
      image: form.image,
      facebook_url: form.facebook_url || null,
      instagram_url: form.instagram_url || null,
      twitter_url: form.twitter_url || null,
    };
    if (editing) {
      const { error } = await supabase.from("mentors").update(payload).eq("id", editing.id);
      if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
    } else {
      const { error } = await supabase.from("mentors").insert(payload);
      if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
    }
    toast({ title: editing ? "Updated" : "Created" });
    setOpen(false);
    fetchData();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this team member?")) return;
    await supabase.from("mentors").delete().eq("id", id);
    toast({ title: "Deleted" });
    fetchData();
  };

  const filtered = items.filter(m => m.name.toLowerCase().includes(search.toLowerCase()));

  if (loading) return <div className="flex justify-center p-12"><Loader2 className="w-8 h-8 animate-spin text-[hsl(var(--gold))]" /></div>;

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold text-white flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            Team Members
          </h1>
          <p className="text-white/50 mt-1">{items.length} mentors</p>
        </div>
        <Button onClick={openNew} className="bg-gradient-to-r from-rose-500 to-pink-600 text-white hover:from-rose-600 hover:to-pink-700 shadow-lg shadow-rose-500/25">
          <Plus className="w-4 h-4 mr-2" />Add Member
        </Button>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
        <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search members..."
          className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-rose-500/50" />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((m, i) => (
          <motion.div key={m.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-rose-500/30 transition-all">
            <div className="h-48 overflow-hidden relative">
              <img src={m.image} alt={m.name} className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.svg'; }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            </div>
            <div className="p-4">
              <h3 className="font-heading font-bold text-white text-sm">{m.name}</h3>
              <p className="text-xs text-rose-400 mb-2">{m.designation}</p>
              <p className="text-xs text-white/40 line-clamp-2 mb-3">{m.bio}</p>
              <div className="flex gap-2">
                <Button size="sm" variant="ghost" onClick={() => openEdit(m)} className="text-white/60 hover:text-white hover:bg-white/10 text-xs">
                  <Pencil className="w-3 h-3 mr-1" />Edit
                </Button>
                <Button size="sm" variant="ghost" onClick={() => handleDelete(m.id)} className="text-red-400/70 hover:text-red-400 hover:bg-red-500/10 text-xs">
                  <Trash2 className="w-3 h-3 mr-1" />Delete
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-[hsl(213,56%,12%)] border-white/10 text-white">
          <DialogHeader><DialogTitle className="text-white">{editing ? "Edit" : "Add"} Team Member</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div><Label className="text-white/70">Name</Label><Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="bg-white/5 border-white/10 text-white" /></div>
            <div><Label className="text-white/70">Designation</Label><Input value={form.designation} onChange={e => setForm({ ...form, designation: e.target.value })} className="bg-white/5 border-white/10 text-white" /></div>
            <ImageCropper value={form.image} onChange={(url) => setForm({ ...form, image: url })} folder="mentors" aspectRatio={3/4} label="Photo" />
            <div><Label className="text-white/70">Bio</Label><Textarea value={form.bio} onChange={e => setForm({ ...form, bio: e.target.value })} className="bg-white/5 border-white/10 text-white" /></div>
            <div className="space-y-3 pt-2 border-t border-white/10">
              <Label className="text-white/50 text-xs uppercase tracking-wider">Social Media (Optional)</Label>
              <div className="flex items-center gap-2">
                <Facebook className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <Input value={form.facebook_url} onChange={e => setForm({ ...form, facebook_url: e.target.value })} placeholder="Facebook profile URL" className="bg-white/5 border-white/10 text-white text-sm" />
              </div>
              <div className="flex items-center gap-2">
                <Instagram className="w-4 h-4 text-pink-400 flex-shrink-0" />
                <Input value={form.instagram_url} onChange={e => setForm({ ...form, instagram_url: e.target.value })} placeholder="Instagram profile URL" className="bg-white/5 border-white/10 text-white text-sm" />
              </div>
              <div className="flex items-center gap-2">
                <Twitter className="w-4 h-4 text-sky-400 flex-shrink-0" />
                <Input value={form.twitter_url} onChange={e => setForm({ ...form, twitter_url: e.target.value })} placeholder="Twitter profile URL" className="bg-white/5 border-white/10 text-white text-sm" />
              </div>
            </div>
            <Button onClick={handleSave} className="w-full bg-gradient-to-r from-rose-500 to-pink-600 text-white hover:from-rose-600 hover:to-pink-700">Save</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminTeam;
