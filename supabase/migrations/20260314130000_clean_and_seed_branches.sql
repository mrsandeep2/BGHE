-- Remove old placeholder branches and keep only the real ones
DELETE FROM public.branches
WHERE id NOT IN ('forbesganj', 'hansdiha', 'singheshwar');

-- Ensure all 3 real branches exist (upsert)
INSERT INTO public.branches (id, city, state, address, phone, email)
VALUES
  ('forbesganj',  'Forbesganj',  'Bihar',     'Near T.V. Tower, Block Road, Forbesganj, Bihar', '7546935196', 'bgheofficial@zohomail.in'),
  ('hansdiha',    'Hansdiha',    'Jharkhand', 'Hansdiha, Dumka, Jharkhand',                     '7546935196', 'bgheofficial@zohomail.in'),
  ('singheshwar', 'Singheshwar', 'Bihar',     'Singheshwar, Madhepura, Bihar',                  '7546935196', 'bgheofficial@zohomail.in')
ON CONFLICT (id) DO UPDATE
  SET city       = EXCLUDED.city,
      state      = EXCLUDED.state,
      address    = EXCLUDED.address,
      phone      = EXCLUDED.phone,
      email      = EXCLUDED.email,
      updated_at = now();
