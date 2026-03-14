
-- Create course_categories table
CREATE TABLE public.course_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  description text DEFAULT '',
  status text NOT NULL DEFAULT 'active',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.course_categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read categories" ON public.course_categories FOR SELECT TO public USING (true);
CREATE POLICY "Admins manage categories" ON public.course_categories FOR ALL TO authenticated USING (is_admin(auth.uid()));

-- Add new columns to courses table
ALTER TABLE public.courses
  ADD COLUMN IF NOT EXISTS category_id uuid REFERENCES public.course_categories(id),
  ADD COLUMN IF NOT EXISTS scheme_type text NOT NULL DEFAULT 'NON_DRCC',
  ADD COLUMN IF NOT EXISTS brochure_pdf text,
  ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'active',
  ADD COLUMN IF NOT EXISTS created_by uuid;

-- Seed the 12 main categories
INSERT INTO public.course_categories (name, description) VALUES
  ('Engineering & Technology', 'Technical and engineering programs'),
  ('Medical', 'Medical and healthcare programs'),
  ('Nursing', 'Nursing and patient care programs'),
  ('Pharmacy', 'Pharmaceutical science programs'),
  ('Management', 'Business and management programs'),
  ('Hotel Management', 'Hospitality and hotel management programs'),
  ('Business Management', 'Commerce and business programs'),
  ('Para Medical', 'Allied health and paramedical programs'),
  ('Law', 'Legal studies and law programs'),
  ('Journalism & Mass Communication', 'Media and journalism programs'),
  ('Library & Information Technology', 'Library science and IT programs'),
  ('Education', 'Teaching and education programs');
