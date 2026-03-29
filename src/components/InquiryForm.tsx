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
    fatherName: "",
    motherName: "",
    mobile: "",
    dob: "",
    email: "",
    qualification: "",
    fatherMobile: "",
    address: "",
    courses: [] as string[],
    termsAccepted: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.termsAccepted) {
      toast({ title: "Error", description: "You must accept the terms & conditions.", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("inquiries").insert({
      name: formData.name,
      father_name: formData.fatherName,
      mother_name: formData.motherName,
      mobile: formData.mobile,
      dob: formData.dob,
      email: formData.email,
      qualification: formData.qualification,
      father_mobile: formData.fatherMobile,
      address: formData.address,
      courses: formData.courses,
    });
    setSubmitting(false);
    if (error) {
      toast({ title: "Error", description: "Could not submit registration. Please try again.", variant: "destructive" });
    } else {
      toast({ title: "Registration Submitted!", description: "Thank you for registering. Our team will contact you shortly." });
      setFormData({
        name: "",
        fatherName: "",
        motherName: "",
        mobile: "",
        dob: "",
        email: "",
        qualification: "",
        fatherMobile: "",
        address: "",
        courses: [],
        termsAccepted: false,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      <div className="rounded-2xl border border-border/70 bg-gradient-to-b from-background to-muted/30 p-4 sm:p-6 shadow-sm">
        <div className="mb-4 text-center">
          <h2 className="text-xl font-bold text-foreground mb-1">Registration Form</h2>
          <p className="text-sm text-muted-foreground">Please fill all details carefully. All fields are required.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Name</Label>
            <Input value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
          </div>
          <div>
            <Label>Father's Name</Label>
            <Input value={formData.fatherName} onChange={e => setFormData({ ...formData, fatherName: e.target.value })} required />
          </div>
          <div>
            <Label>Mother's Name</Label>
            <Input value={formData.motherName} onChange={e => setFormData({ ...formData, motherName: e.target.value })} required />
          </div>
          <div>
            <Label>Mobile No</Label>
            <Input value={formData.mobile} onChange={e => setFormData({ ...formData, mobile: e.target.value })} required />
          </div>
          <div>
            <Label>Date of Birth</Label>
            <Input type="date" value={formData.dob} onChange={e => setFormData({ ...formData, dob: e.target.value })} required />
          </div>
          <div>
            <Label>Email ID</Label>
            <Input type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} required />
          </div>
          <div>
            <Label>Qualification</Label>
            <select
              value={formData.qualification}
              onChange={e => setFormData({ ...formData, qualification: e.target.value })}
              required
              className="w-full h-11 rounded-xl border border-border/80 bg-background/80 px-3 text-sm focus-visible:ring-accent/40"
            >
              <option value="" disabled>Select qualification</option>
              <option value="10th">10th</option>
              <option value="12th">12th</option>
              <option value="10th + ITI">10th + ITI</option>
              <option value="12th + ITI">12th + ITI</option>
              <option value="Diploma">Diploma</option>
              <option value="Graduate">Graduate</option>
            </select>
          </div>
          <div>
            <Label>Father's Mobile No</Label>
            <Input value={formData.fatherMobile} onChange={e => setFormData({ ...formData, fatherMobile: e.target.value })} required />
          </div>
          <div className="md:col-span-2">
            <Label>Address</Label>
            <Input value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })} required />
          </div>
        </div>
        <div className="mt-6">
          <Label className="block mb-2">Courses Interested In</Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {['Engineering', 'Medical', 'Management', 'Diploma', 'ITI', 'Others'].map((course) => (
              <label key={course} className="flex items-center gap-2 text-sm font-medium">
                <input
                  type="checkbox"
                  checked={formData.courses.includes(course)}
                  onChange={e => {
                    if (e.target.checked) {
                      setFormData({ ...formData, courses: [...formData.courses, course] });
                    } else {
                      setFormData({ ...formData, courses: formData.courses.filter(c => c !== course) });
                    }
                  }}
                  className="accent-accent w-4 h-4 rounded"
                />
                {course}
              </label>
            ))}
          </div>
        </div>
        <div className="mt-6 flex items-center gap-2">
          <input
            type="checkbox"
            checked={formData.termsAccepted}
            onChange={e => setFormData({ ...formData, termsAccepted: e.target.checked })}
            required
            className="accent-accent w-4 h-4 rounded"
            id="terms"
          />
          <Label htmlFor="terms" className="text-sm font-semibold text-primary">Terms &amp; condition Accepted</Label>
        </div>
      </div>
      <div className="rounded-xl bg-gradient-to-r from-accent/15 via-accent/8 to-primary/10 p-2">
        <Button type="submit" size="default" disabled={submitting}
          className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold text-base h-11 rounded-lg shadow-md shadow-accent/25">
          {submitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
          Submit Registration
        </Button>
      </div>
    </form>
  );
};

export default InquiryForm;
