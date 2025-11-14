/*
  # Seed Data for Employee Management System
  
  This script creates test users with login credentials for testing the application.
  
  ## Test Accounts Created:
  
  ### Admin Account
  - Email: admin@miracle.com
  - Password: Admin@123456
  - Role: Administrator (full access)
  
  ### Employee Accounts
  - Email: employee1@miracle.com
  - Password: Employee@123
  - Role: Employee (read-only access)
  
  - Email: employee2@miracle.com
  - Password: Employee@123
  - Role: Employee (read-only access)
  
  ## Instructions:
  1. Run this script AFTER running the main migration (create_employees_table.sql)
  2. Use the credentials above to log into the application
  3. Change passwords after first login in production
*/

-- Note: In Supabase, you need to create auth users through the dashboard or API
-- This script assumes you've created the users in Supabase Auth first
-- Then it links them to the employees table

-- For testing purposes, here's how to create the users:
-- 1. Go to Supabase Dashboard → Authentication → Users
-- 2. Create users with the emails and passwords listed above
-- 3. Copy their user IDs and update the INSERT statements below

-- Example: Insert admin user (replace 'admin-user-id-here' with actual UUID from Supabase Auth)
-- INSERT INTO employees (user_id, name, email, phone, role, created_by)
-- VALUES (
--   'admin-user-id-here',
--   'Admin User',
--   'admin@miracle.com',
--   '+1-555-0100',
--   'admin',
--   'admin-user-id-here'
-- );

-- Example: Insert employee users (replace UUIDs with actual values)
-- INSERT INTO employees (user_id, name, email, phone, role, created_by)
-- VALUES 
--   (
--     'employee1-user-id-here',
--     'John Smith',
--     'employee1@miracle.com',
--     '+1-555-0101',
--     'employee',
--     'admin-user-id-here'
--   ),
--   (
--     'employee2-user-id-here',
--     'Jane Doe',
--     'employee2@miracle.com',
--     '+1-555-0102',
--     'employee',
--     'admin-user-id-here'
--   );

-- ============================================================================
-- AUTOMATED SETUP (Use this if you have Supabase CLI or service role key)
-- ============================================================================

-- If you're running this through Supabase SQL Editor with proper permissions,
-- you can use this approach to create test users automatically:

DO $$
DECLARE
  admin_user_id uuid;
  employee1_user_id uuid;
  employee2_user_id uuid;
BEGIN
  -- Note: Creating auth users directly requires service_role privileges
  -- This is typically done through the Supabase API, not SQL
  
  -- For now, print instructions:
  RAISE NOTICE '========================================';
  RAISE NOTICE 'MANUAL SETUP REQUIRED';
  RAISE NOTICE '========================================';
  RAISE NOTICE 'Please create these users in Supabase Dashboard:';
  RAISE NOTICE '';
  RAISE NOTICE '1. Admin User:';
  RAISE NOTICE '   Email: admin@miracle.com';
  RAISE NOTICE '   Password: Admin@123456';
  RAISE NOTICE '';
  RAISE NOTICE '2. Employee 1:';
  RAISE NOTICE '   Email: employee1@miracle.com';
  RAISE NOTICE '   Password: Employee@123';
  RAISE NOTICE '';
  RAISE NOTICE '3. Employee 2:';
  RAISE NOTICE '   Email: employee2@miracle.com';
  RAISE NOTICE '   Password: Employee@123';
  RAISE NOTICE '';
  RAISE NOTICE 'After creating users, run the companion script:';
  RAISE NOTICE 'seed-employees.sql';
  RAISE NOTICE '========================================';
END $$;
