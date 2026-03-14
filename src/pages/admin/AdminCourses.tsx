import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Loader2, BookOpen, Search, Clock, FileText, Upload, Landmark } from "lucide-react";
import { motion } from "framer-motion";

interface Category { id: string; name: string; status: string; }

interface Course {
  id: string;
  name: string;
  category: string;
  category_id: string | null;
  duration: string;
  description: string;
  icon: string;
  scheme_type: string;
  brochure_pdf: string | null;
  status: string;
  created_by: string | null;
}

const emptyForm = {
  name: "", category: "", category_id: "", duration: "", description: "",
  icon: "BookOpen", scheme_type: "NON_DRCC", brochure_pdf: "", status: "active"
};

const AdminCourses = () => {
  const { role, user } = useAuth();
  const [items, setItems] = useState<Course[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Course | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [search, setSearch] = useState("");
  const [schemeFilter, setSchemeFilter] = useState("ALL");
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const isSuperAdmin = role === "super_admin";

  const fetchData = async () => {
    const [coursesRes, catsRes] = await Promise.all([
      supabase.from("courses").select("*").order("category"),
      supabase.from("course_categories").select("*").eq("status", "active").order("name"),
    ]);
    setItems((coursesRes.data as Course[]) || []);
    setCategories((catsRes.data as Category[]) || []);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const openEdit = (c: Course) => {
    setEditing(c);
    setForm({
      name: c.name, category: c.category, category_id: c.category_id || "",
      duration: c.duration, description: c.description, icon: c.icon,
      scheme_type: c.scheme_type || "NON_DRCC", brochure_pdf: c.brochure_pdf || "",
      status: c.status || "active",
    });
    setOpen(true);
  };

  const openNew = () => { setEditing(null); setForm(emptyForm); setOpen(true); };

  const handleCategoryChange = (catId: string) => {
    const cat = categories.find(c => c.id === catId);
    setForm({ ...form, category_id: catId, category: cat?.name || "" });
  };

  const handleBrochureUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type !== "application/pdf") {
      toast({ title: "Only PDF files allowed", variant: "destructive" });
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast({ title: "File too large (max 10MB)", variant: "destructive" });
      return;
    }
    setUploading(true);
    const fileName = `brochures/${Date.now()}_${file.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
    const { error } = await supabase.storage.from("media").upload(fileName, file, { upsert: true });
    if (error) {
      toast({ title: "Upload failed", description: error.message, variant: "destructive" });
      setUploading(false);
      return;
    }
    const { data: urlData } = supabase.storage.from("media").getPublicUrl(fileName);
    setForm({ ...form, brochure_pdf: urlData.publicUrl });
    setUploading(false);
    toast({ title: "Brochure uploaded" });
  };

  const handleSave = async () => {
    if (!form.name.trim() || !form.category_id) {
      toast({ title: "Name and category required", variant: "destructive" });
      return;
    }
    const payload = {
      name: form.name.trim(),
      category: form.category,
      category_id: form.category_id,
      duration: form.duration,
      description: form.description,
      icon: form.icon,
      scheme_type: form.scheme_type,
      brochure_pdf: form.brochure_pdf || null,
      status: form.status,
      ...(editing ? {} : { created_by: user?.id || null }),
    };

    if (editing) {
      const { error } = await supabase.from("courses").update(payload).eq("id", editing.id);
      if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
    } else {
      const { error } = await supabase.from("courses").insert(payload);
      if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
    }
    toast({ title: editing ? "Updated" : "Created" });
    setOpen(false);
    fetchData();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this course?")) return;
    await supabase.from("courses").delete().eq("id", id);
    toast({ title: "Deleted" });
    fetchData();
  };

  const filtered = items
    .filter(c => schemeFilter === "ALL" || c.scheme_type === schemeFilter)
    .filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.category.toLowerCase().includes(search.toLowerCase()));

  const drccCount = items.filter(c => c.scheme_type === "DRCC").length;
  const nonDrccCount = items.filter(c => c.scheme_type === "NON_DRCC").length;

  if (loading) return <div className="flex justify-center p-12"><Loader2 className="w-8 h-8 animate-spin text-[hsl(var(--gold))]" /></div>;

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold text-white flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            Courses
          </h1>
          <p className="text-white/50 mt-1">
            {items.length} total · {drccCount} DRCC · {nonDrccCount} Non-DRCC
          </p>
        </div>
        <Button onClick={openNew} className="bg-gradient-to-r from-amber-500 to-orange-600 text-white hover:from-amber-600 hover:to-orange-700 shadow-lg shadow-amber-500/25">
          <Plus className="w-4 h-4 mr-2" />Add Course
        </Button>
      </div>

      {/* Scheme Filter Tabs */}
      <div className="flex gap-2 mb-4">
        {[
          { key: "ALL", label: "All", count: items.length },
          { key: "DRCC", label: "DRCC", count: drccCount },
          { key: "NON_DRCC", label: "Non-DRCC", count: nonDrccCount },
        ].map(tab => (
          <button key={tab.key} onClick={() => setSchemeFilter(tab.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${schemeFilter === tab.key
              ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
              : "bg-white/5 text-white/50 border border-white/10 hover:bg-white/10"}`}>
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
        <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search courses..."
          className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-amber-500/50" />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((c, i) => (
          <motion.div key={c.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
            className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 hover:border-amber-500/30 transition-all">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div className="flex items-center gap-1.5">
                {c.scheme_type === "DRCC" && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-green-500/20 text-green-400 flex items-center gap-1">
                    <Landmark className="w-3 h-3" />DRCC
                  </span>
                )}
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${c.status === "active" ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"}`}>
                  {c.status}
                </span>
              </div>
            </div>
            <h3 className="font-heading font-bold text-white text-sm mb-1">{c.name}</h3>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="text-xs text-white/50 bg-white/5 px-2 py-0.5 rounded-full">{c.category}</span>
              <span className="text-xs text-white/40 flex items-center gap-1"><Clock className="w-3 h-3" />{c.duration}</span>
            </div>
            <p className="text-xs text-white/40 line-clamp-2 mb-2">{c.description}</p>
            {c.brochure_pdf && (
              <a href={c.brochure_pdf} target="_blank" rel="noopener noreferrer"
                className="text-xs text-amber-400 flex items-center gap-1 mb-2 hover:underline">
                <FileText className="w-3 h-3" />View Brochure
              </a>
            )}
            <div className="flex gap-2">
              <Button size="sm" variant="ghost" onClick={() => openEdit(c)} className="text-white/60 hover:text-white hover:bg-white/10 text-xs">
                <Pencil className="w-3 h-3 mr-1" />Edit
              </Button>
              {isSuperAdmin && (
                <Button size="sm" variant="ghost" onClick={() => handleDelete(c.id)} className="text-red-400/70 hover:text-red-400 hover:bg-red-500/10 text-xs">
                  <Trash2 className="w-3 h-3 mr-1" />Delete
                </Button>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-10 h-10 text-white/20 mx-auto mb-3" />
          <p className="text-white/40">No courses found</p>
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-[hsl(213,56%,12%)] border-white/10 text-white max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle className="text-white">{editing ? "Edit" : "Add"} Course</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div>
              <Label className="text-white/70">Main Category *</Label>
              <Select value={form.category_id} onValueChange={handleCategoryChange}>
                <SelectTrigger className="bg-white/5 border-white/10 text-white"><SelectValue placeholder="Select category" /></SelectTrigger>
                <SelectContent>
                  {categories.map(cat => (
                    <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div><Label className="text-white/70">Course Name *</Label><Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="bg-white/5 border-white/10 text-white" placeholder="e.g. Computer Science Engineering (CSE)" /></div>
            <div>
              <Label className="text-white/70">Scheme Type *</Label>
              <Select value={form.scheme_type} onValueChange={v => setForm({ ...form, scheme_type: v })}>
                <SelectTrigger className="bg-white/5 border-white/10 text-white"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="DRCC">DRCC Scheme</SelectItem>
                  <SelectItem value="NON_DRCC">Non-DRCC</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div><Label className="text-white/70">Duration</Label><Input value={form.duration} onChange={e => setForm({ ...form, duration: e.target.value })} placeholder="e.g. 4 Years" className="bg-white/5 border-white/10 text-white placeholder:text-white/30" /></div>
            <div><Label className="text-white/70">Description</Label><Textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="bg-white/5 border-white/10 text-white" rows={3} /></div>
            <div><Label className="text-white/70">Icon name</Label><Input value={form.icon} onChange={e => setForm({ ...form, icon: e.target.value })} placeholder="BookOpen" className="bg-white/5 border-white/10 text-white placeholder:text-white/30" /></div>
            <div>
              <Label className="text-white/70">Brochure PDF</Label>
              <div className="flex items-center gap-3">
                <label className="flex-1 cursor-pointer">
                  <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-md px-3 py-2 hover:bg-white/10 transition-colors">
                    <Upload className="w-4 h-4 text-white/50" />
                    <span className="text-sm text-white/50">{uploading ? "Uploading..." : form.brochure_pdf ? "Replace PDF" : "Upload PDF"}</span>
                  </div>
                  <input type="file" accept=".pdf" className="hidden" onChange={handleBrochureUpload} disabled={uploading} />
                </label>
                {form.brochure_pdf && (
                  <a href={form.brochure_pdf} target="_blank" rel="noopener noreferrer" className="text-xs text-amber-400 hover:underline flex items-center gap-1">
                    <FileText className="w-3 h-3" />View
                  </a>
                )}
              </div>
            </div>
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
            <Button onClick={handleSave} className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white hover:from-amber-600 hover:to-orange-700">
              {uploading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}Save
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminCourses;
