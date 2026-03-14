import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useBranches, useCourseCategories } from "@/hooks/useDbData";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

interface InquiryFormProps {
  compact?: boolean;
  className?: string;
}

const InquiryForm = ({ compact = false, className = "" }: InquiryFormProps) => {
  const { toast } = useToast();
  const { data: branches = [] } = useBranches();
  const { data: categories = [] } = useCourseCategories();
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    courseInterest: "",
    branch: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const { error } = await supabase.from("inquiries").insert({
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      course_interest: formData.courseInterest || null,
      branch_id: formData.branch || null,
    });
    setSubmitting(false);
    if (error) {
      toast({ title: "Error", description: "Could not submit inquiry. Please try again.", variant: "destructive" });
    } else {
      toast({ title: "Inquiry Submitted!", description: "Thank you for your interest. Our team will contact you shortly." });
      setFormData({ name: "", phone: "", email: "", courseInterest: "", branch: "" });
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`space-y-3 ${className}`}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label htmlFor="name" className="text-xs font-semibold">Full Name</Label>
          <Input id="name" placeholder="Enter your full name" value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })} required className="h-9 text-sm" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="phone" className="text-xs font-semibold">Phone Number</Label>
          <Input id="phone" type="tel" placeholder="+91 XXXXX XXXXX" value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required className="h-9 text-sm" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="email" className="text-xs font-semibold">Email Address</Label>
          <Input id="email" type="email" placeholder="your.email@example.com" value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })} required className="h-9 text-sm" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="course" className="text-xs font-semibold">Course Interest</Label>
          <Select value={formData.courseInterest} onValueChange={(v) => setFormData({ ...formData, courseInterest: v })}>
            <SelectTrigger className="h-9 text-sm"><SelectValue placeholder="Select a course area" /></SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {!compact && (
          <div className="space-y-1.5 sm:col-span-2 sm:max-w-[calc(50%-0.375rem)]">
            <Label htmlFor="branch" className="text-xs font-semibold">Preferred Branch</Label>
            <Select value={formData.branch} onValueChange={(v) => setFormData({ ...formData, branch: v })}>
              <SelectTrigger className="h-9 text-sm"><SelectValue placeholder="Select nearest branch" /></SelectTrigger>
              <SelectContent>
                {branches.map((b) => (
                  <SelectItem key={b.id} value={b.id}>{b.city}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
      <Button type="submit" size="default" disabled={submitting}
        className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold text-sm h-10">
        {submitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
        Submit Inquiry
      </Button>
    </form>
  );
};

export default InquiryForm;
