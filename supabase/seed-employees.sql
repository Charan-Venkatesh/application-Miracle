/*
  # Link Auth Users to Employees Table
  
  Run this AFTER creating users in Supabase Auth Dashboard.
  This script finds the auth users by email and creates employee records.
*/

-- Insert admin user into employees table
INSERT INTO employees (user_id, name, email, phone, role, created_by)
SELECT 
  id as user_id,
  'Admin User' as name,
  'admin@miracle.com' as email,
  '+1-555-0100' as phone,
  'admin' as role,
  id as created_by
FROM auth.users
WHERE email = 'admin@miracle.com'
ON CONFLICT (email) DO NOTHING;

-- Insert employee users into employees table
INSERT INTO employees (user_id, name, email, phone, role, created_by)
SELECT 
  u.id as user_id,
  CASE 
    WHEN u.email = 'employee1@miracle.com' THEN 'John Smith'
    WHEN u.email = 'employee2@miracle.com' THEN 'Jane Doe'
  END as name,
  u.email,
  CASE 
    WHEN u.email = 'employee1@miracle.com' THEN '+1-555-0101'
    WHEN u.email = 'employee2@miracle.com' THEN '+1-555-0102'
  END as phone,
  'employee' as role,
  (SELECT id FROM auth.users WHERE email = 'admin@miracle.com') as created_by
FROM auth.users u
WHERE u.email IN ('employee1@miracle.com', 'employee2@miracle.com')
ON CONFLICT (email) DO NOTHING;

-- Verify the data
SELECT 
  e.name,
  e.email,
  e.role,
  e.phone,
  CASE WHEN e.user_id IS NOT NULL THEN 'Linked' ELSE 'Not Linked' END as auth_status
FROM employees e
ORDER BY e.role DESC, e.name;
