-- Remove only the old Bangalore placeholder branch
DELETE FROM public.branches
WHERE id = 'bangalore';
