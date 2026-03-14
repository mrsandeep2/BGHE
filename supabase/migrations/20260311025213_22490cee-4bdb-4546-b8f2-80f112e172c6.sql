
CREATE TABLE public.drcc_courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_name text NOT NULL,
  university_id uuid REFERENCES public.universities(id) ON DELETE CASCADE NOT NULL,
  fee_amount numeric DEFAULT 0,
  loan_amount numeric DEFAULT 0,
  eligibility text DEFAULT '',
  available_seats integer DEFAULT 0,
  intake_year text DEFAULT '',
  status text NOT NULL DEFAULT 'active',
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.drcc_courses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read drcc_courses" ON public.drcc_courses FOR SELECT TO public USING (true);
CREATE POLICY "Admins manage drcc_courses" ON public.drcc_courses FOR ALL TO authenticated USING (is_admin(auth.uid()));
