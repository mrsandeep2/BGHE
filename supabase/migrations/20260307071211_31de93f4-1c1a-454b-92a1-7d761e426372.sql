
-- Create a function to assign super_admin role after signup (one-time setup helper)
-- You can call this after creating your first admin user
CREATE OR REPLACE FUNCTION public.make_super_admin(_email TEXT)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _user_id UUID;
BEGIN
  SELECT id INTO _user_id FROM auth.users WHERE email = _email;
  IF _user_id IS NULL THEN
    RAISE EXCEPTION 'User not found with email: %', _email;
  END IF;
  INSERT INTO public.user_roles (user_id, role)
  VALUES (_user_id, 'super_admin')
  ON CONFLICT (user_id, role) DO NOTHING;
END;
$$;
