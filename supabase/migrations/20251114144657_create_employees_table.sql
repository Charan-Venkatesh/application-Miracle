/*
  # Employee Management System Database Schema

  ## Overview
  Creates the database structure for a role-based employee management system with two roles: 
  Administrator and Employee.

  ## New Tables
  
  ### `employees`
  Stores employee information managed by administrators.
  - `id` (uuid, primary key) - Unique employee identifier
  - `user_id` (uuid, foreign key) - Links to auth.users for employees who have login accounts
  - `name` (text) - Employee full name
  - `email` (text, unique) - Employee email address
  - `phone` (text) - Employee phone number
  - `role` (text) - Either 'admin' or 'employee'
  - `created_at` (timestamptz) - Record creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp
  - `created_by` (uuid) - ID of admin who created this record

  ## Security
  
  ### Row Level Security (RLS)
  - Enabled on all tables
  - Admins can perform all operations on employee records
  - Employees can only view their own profile and view other employees (read-only)
  
  ### Policies Created
  1. Admins can view all employees
  2. Admins can create new employees
  3. Admins can update employee records
  4. Admins can delete employee records
  5. Employees can view all employee records (team visibility)
  6. Employees can view their own profile details
*/

-- Create employees table
CREATE TABLE IF NOT EXISTS employees (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  phone text,
  role text NOT NULL CHECK (role IN ('admin', 'employee')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE employees ENABLE ROW LEVEL SECURITY;

-- Create a function to check if user is admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM employees
    WHERE user_id = auth.uid()
    AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Admins can view all employees
CREATE POLICY "Admins can view all employees"
  ON employees
  FOR SELECT
  TO authenticated
  USING (is_admin());

-- Admins can create employees
CREATE POLICY "Admins can create employees"
  ON employees
  FOR INSERT
  TO authenticated
  WITH CHECK (is_admin());

-- Admins can update employees
CREATE POLICY "Admins can update employees"
  ON employees
  FOR UPDATE
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

-- Admins can delete employees
CREATE POLICY "Admins can delete employees"
  ON employees
  FOR DELETE
  TO authenticated
  USING (is_admin());

-- Employees can view all employee records (team visibility)
CREATE POLICY "Employees can view all employees"
  ON employees
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM employees
      WHERE user_id = auth.uid()
      AND role = 'employee'
    )
  );

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add trigger to automatically update updated_at
CREATE TRIGGER update_employees_updated_at
  BEFORE UPDATE ON employees
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_employees_user_id ON employees(user_id);
CREATE INDEX IF NOT EXISTS idx_employees_email ON employees(email);
CREATE INDEX IF NOT EXISTS idx_employees_role ON employees(role);
