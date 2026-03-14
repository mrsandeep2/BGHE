import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Loader2, Search, Landmark, IndianRupee, Users, CalendarDays } from "lucide-react";
import { motion } from "framer-motion";

interface DrccCourse {
  id: string;
  course_name: string;
  university_id: string;
  fee_amount: number;
  loan_amount: number;
  eligibility: string;
  available_seats: number;
  intake_year: string;
  status: string;
}

interface University {
  id: string;
  name: string;
}

const emptyForm = {
  course_name: "",
  university_id: "",
  fee_amount: 0,
  loan_amount: 0,
  eligibility: "",
  available_seats: 0,
  intake_year: new Date().getFullYear().toString(),
  status: "active",
};

const AdminDRCC = () => {
  const [items, setItems] = useState<DrccCourse[]>([]);
  const [universities, setUniversities] = useState<University[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<DrccCourse | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [search, setSearch] = useState("");
  const { toast } = useToast();

  const fetchData = async () => {
    const [{ data: drcc }, { data: unis }] = await Promise.all([
      supabase.from("drcc_courses").select("*").order("course_name"),
      supabase.from("universities").select("id, name").order("name"),
    ]);
    setItems((drcc as DrccCourse[]) || []);
    setUniversities((unis as University[]) || []);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const getUniName = (id: string) => universities.find(u => u.id === id)?.name || "Unknown";

  const openEdit = (item: DrccCourse) => {
    setEditing(item);
    setForm({
      course_name: item.course_name,
      university_id: item.university_id,
      fee_amount: item.fee_amount,
      loan_amount: item.loan_amount,
      eligibility: item.eligibility,
      available_seats: item.available_seats,
      intake_year: item.intake_year,
      status: item.status,
    });
    setOpen(true);
  };

  const openNew = () => { setEditing(null); setForm(emptyForm); setOpen(true); };

  const handleSave = async () => {
    if (!form.course_name || !form.university_id) {
      toast({ title: "Error", description: "Course name and university are required", variant: "destructive" });
      return;
    }
    const payload = { ...form };
    if (editing) {
      const { error } = await supabase.from("drcc_courses").update(payload).eq("id", editing.id);
      if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
    } else {
      const { error } = await supabase.from("drcc_courses").insert(payload);
      if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
    }
    toast({ title: editing ? "Updated" : "Created" });
    setOpen(false);
    fetchData();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this DRCC course mapping?")) return;
    await supabase.from("drcc_courses").delete().eq("id", id);
    toast({ title: "Deleted" });
    fetchData();
  };

  const filtered = items.filter(d =>
    d.course_name.toLowerCase().includes(search.toLowerCase()) ||
    getUniName(d.university_id).toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="flex justify-center p-12"><Loader2 className="w-8 h-8 animate-spin text-[hsl(var(--gold))]" /></div>;

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold text-white flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
              <Landmark className="w-5 h-5 text-white" />
            </div>
            DRCC Courses
          </h1>
          <p className="text-white/50 mt-1">{items.length} course-college mappings · Bihar Govt. Scheme (up to ₹4 Lakh loan)</p>
        </div>
        <Button onClick={openNew} className="bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 shadow-lg shadow-green-500/25">
          <Plus className="w-4 h-4 mr-2" />Add DRCC Course
        </Button>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
        <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by course or university..."
          className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-green-500/50" />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((d, i) => (
          <motion.div key={d.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-green-500/30 transition-all p-5">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-heading font-bold text-white text-base mb-1">{d.course_name}</h3>
                <p className="text-white/50 text-xs">{getUniName(d.university_id)}</p>
              </div>
              <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${d.status === "active" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                {d.status}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="bg-white/5 rounded-lg p-2">
                <p className="text-[10px] text-white/40 flex items-center gap-1"><IndianRupee className="w-3 h-3" />Fee</p>
                <p className="text-white text-sm font-semibold">₹{d.fee_amount?.toLocaleString()}</p>
              </div>
              <div className="bg-white/5 rounded-lg p-2">
                <p className="text-[10px] text-white/40 flex items-center gap-1"><IndianRupee className="w-3 h-3" />Loan</p>
                <p className="text-green-400 text-sm font-semibold">₹{d.loan_amount?.toLocaleString()}</p>
              </div>
              <div className="bg-white/5 rounded-lg p-2">
                <p className="text-[10px] text-white/40 flex items-center gap-1"><Users className="w-3 h-3" />Seats</p>
                <p className="text-white text-sm font-semibold">{d.available_seats}</p>
              </div>
              <div className="bg-white/5 rounded-lg p-2">
                <p className="text-[10px] text-white/40 flex items-center gap-1"><CalendarDays className="w-3 h-3" />Intake</p>
                <p className="text-white text-sm font-semibold">{d.intake_year}</p>
              </div>
            </div>
            {d.eligibility && <p className="text-[11px] text-white/40 mb-3 line-clamp-2">Eligibility: {d.eligibility}</p>}
            <div className="flex gap-2">
              <Button size="sm" variant="ghost" onClick={() => openEdit(d)} className="text-white/60 hover:text-white hover:bg-white/10 text-xs">
                <Pencil className="w-3 h-3 mr-1" />Edit
              </Button>
              <Button size="sm" variant="ghost" onClick={() => handleDelete(d.id)} className="text-red-400/70 hover:text-red-400 hover:bg-red-500/10 text-xs">
                <Trash2 className="w-3 h-3 mr-1" />Delete
              </Button>
            </div>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && !loading && (
        <div className="text-center py-16 text-white/30">
          <Landmark className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p>No DRCC courses found. Add your first mapping!</p>
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-[hsl(213,56%,12%)] border-white/10 text-white max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle className="text-white">{editing ? "Edit" : "Add"} DRCC Course</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div>
              <Label className="text-white/70">Course / Program Name</Label>
              <Input value={form.course_name} onChange={e => setForm({ ...form, course_name: e.target.value })} placeholder="e.g. B.Tech (CSE)" className="bg-white/5 border-white/10 text-white placeholder:text-white/30" />
            </div>
            <div>
              <Label className="text-white/70">University / College</Label>
              <Select value={form.university_id} onValueChange={v => setForm({ ...form, university_id: v })}>
                <SelectTrigger className="bg-white/5 border-white/10 text-white"><SelectValue placeholder="Select university" /></SelectTrigger>
                <SelectContent>
                  {universities.map(u => <SelectItem key={u.id} value={u.id}>{u.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-white/70">Fee Amount (₹)</Label>
                <Input type="number" value={form.fee_amount} onChange={e => setForm({ ...form, fee_amount: Number(e.target.value) })} className="bg-white/5 border-white/10 text-white" />
              </div>
              <div>
                <Label className="text-white/70">Loan Amount (₹)</Label>
                <Input type="number" value={form.loan_amount} onChange={e => setForm({ ...form, loan_amount: Number(e.target.value) })} className="bg-white/5 border-white/10 text-white" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-white/70">Available Seats</Label>
                <Input type="number" value={form.available_seats} onChange={e => setForm({ ...form, available_seats: Number(e.target.value) })} className="bg-white/5 border-white/10 text-white" />
              </div>
              <div>
                <Label className="text-white/70">Intake Year</Label>
                <Input value={form.intake_year} onChange={e => setForm({ ...form, intake_year: e.target.value })} placeholder="2025-26" className="bg-white/5 border-white/10 text-white placeholder:text-white/30" />
              </div>
            </div>
            <div>
              <Label className="text-white/70">Status</Label>
              <Select value={form.status} onValueChange={v => setForm({ ...form, status: v })}>
                <SelectTrigger className="bg-white/5 border-white/10 text-white"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-white/70">Eligibility Criteria</Label>
              <Textarea value={form.eligibility} onChange={e => setForm({ ...form, eligibility: e.target.value })} placeholder="e.g. 12th pass with 60% marks" className="bg-white/5 border-white/10 text-white placeholder:text-white/30" />
            </div>
            <Button onClick={handleSave} className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700">Save</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDRCC;
