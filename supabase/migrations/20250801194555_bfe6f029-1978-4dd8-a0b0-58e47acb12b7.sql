-- Update user_role enum to include superadmin and lecturer
ALTER TYPE user_role ADD VALUE IF NOT EXISTS 'superadmin';
ALTER TYPE user_role ADD VALUE IF NOT EXISTS 'lecturer';

-- Assign superadmin role to specific user (replace with actual user ID)
-- You'll need to get the actual user ID from your auth.users table
UPDATE user_roles 
SET role = 'superadmin' 
WHERE user_id = '6bd6df8e-81b4-4c43-a1bb-4fa3c72a131a';  -- Replace with actual superadmin user ID