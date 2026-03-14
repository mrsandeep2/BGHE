import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useBranches, useCourseCategories } from "@/hooks/useDbData";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2, ShieldCheck } from "lucide-react";

interface InquiryFormProps {
  compact?: boolean;
  className?: string;
}

const InquiryForm = ({ compact = false, className = "" }: InquiryFormProps) => {
  const inquiryWhatsappNumber = "917546935196";
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
      const selectedBranch = branches.find((b) => b.id === formData.branch);
      const messageLines = [
        "New Inquiry Received",
        `Name: ${formData.name}`,
        `Phone: ${formData.phone}`,
        `Email: ${formData.email}`,
        `Course Interest: ${formData.courseInterest || "Not specified"}`,
        `Preferred Branch: ${selectedBranch ? `${selectedBranch.city}, ${selectedBranch.state}` : "Not specified"}`,
      ];
      const encodedMessage = encodeURIComponent(messageLines.join("\n"));
      const whatsappUrl = `https://wa.me/${inquiryWhatsappNumber}?text=${encodedMessage}`;

      toast({ title: "Inquiry Submitted!", description: "Thank you for your interest. Our team will contact you shortly." });
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
      setFormData({ name: "", phone: "", email: "", courseInterest: "", branch: "" });
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      <div className="rounded-2xl border border-border/70 bg-gradient-to-b from-background to-muted/30 p-4 sm:p-5 shadow-sm">
        <div className="mb-4 rounded-xl border border-emerald-200/50 bg-emerald-50/70 px-3 py-2.5 text-xs text-emerald-700 flex items-center gap-2">
          <ShieldCheck className="h-4 w-4" />
          Your details are secure and used only for admission counseling.
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div className="space-y-1.5">
            <Label htmlFor="name" className="text-xs font-semibold tracking-wide">Full Name</Label>
            <Input id="name" placeholder="Enter your full name" value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })} required className="h-11 text-sm rounded-xl bg-background/80 border-border/80 focus-visible:ring-accent/40" />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="phone" className="text-xs font-semibold tracking-wide">Phone Number</Label>
            <Input id="phone" type="tel" placeholder="+91 XXXXX XXXXX" value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required className="h-11 text-sm rounded-xl bg-background/80 border-border/80 focus-visible:ring-accent/40" />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-xs font-semibold tracking-wide">Email Address</Label>
            <Input id="email" type="email" placeholder="your.email@example.com" value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })} required className="h-11 text-sm rounded-xl bg-background/80 border-border/80 focus-visible:ring-accent/40" />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="course" className="text-xs font-semibold tracking-wide">Course Interest</Label>
            <Select value={formData.courseInterest} onValueChange={(v) => setFormData({ ...formData, courseInterest: v })}>
              <SelectTrigger className="h-11 text-sm rounded-xl bg-background/80 border-border/80 focus:ring-accent/40"><SelectValue placeholder="Select a course area" /></SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {!compact && (
            <div className="space-y-1.5 sm:col-span-2 sm:max-w-[calc(50%-0.375rem)]">
              <Label htmlFor="branch" className="text-xs font-semibold tracking-wide">Preferred Branch</Label>
              <Select value={formData.branch} onValueChange={(v) => setFormData({ ...formData, branch: v })}>
                <SelectTrigger className="h-11 text-sm rounded-xl bg-background/80 border-border/80 focus:ring-accent/40"><SelectValue placeholder="Select nearest branch" /></SelectTrigger>
                <SelectContent>
                  {branches.map((b) => (
                    <SelectItem key={b.id} value={b.id}>{b.city}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      </div>

      <div className="rounded-xl bg-gradient-to-r from-accent/15 via-accent/8 to-primary/10 p-2">
        <Button type="submit" size="default" disabled={submitting}
          className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold text-base h-11 rounded-lg shadow-md shadow-accent/25">
          {submitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
          Submit Inquiry
        </Button>
      </div>
    </form>
  );
};

export default InquiryForm;
