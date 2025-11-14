# Employee Management System - Setup Guide

## 🚀 Quick Start with Test Credentials

Follow these steps to get the application running with test login credentials.

---

## Step 1: Configure Supabase

### 1.1 Create/Access Your Supabase Project
1. Go to https://app.supabase.com
2. Sign in or create an account
3. Create a new project or select an existing one
4. Wait for the project to finish setting up

### 1.2 Get Your API Credentials
1. In your Supabase project, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon/public key** (starts with `eyJ...`)

### 1.3 Update Environment Variables
1. Open `.env` file in the project root
2. Replace the placeholder values:
```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

---

## Step 2: Set Up Database

### 2.1 Run Migration Script
1. In Supabase Dashboard, go to **SQL Editor**
2. Click **New Query**
3. Copy the contents of `supabase/migrations/20251114144657_create_employees_table.sql`
4. Paste and click **Run**
5. You should see "Success. No rows returned"

---

## Step 3: Create Test Users

### 3.1 Create Auth Users in Supabase
1. Go to **Authentication** → **Users** in Supabase Dashboard
2. Click **Add user** → **Create new user**
3. Create the following users:

#### Admin User
- **Email:** `admin@miracle.com`
- **Password:** `Admin@123456`
- ✓ Auto Confirm User (check this box)

#### Employee User 1
- **Email:** `employee1@miracle.com`
- **Password:** `Employee@123`
- ✓ Auto Confirm User (check this box)

#### Employee User 2
- **Email:** `employee2@miracle.com`
- **Password:** `Employee@123`
- ✓ Auto Confirm User (check this box)

### 3.2 Link Users to Employees Table
1. Go back to **SQL Editor** in Supabase
2. Copy the contents of `supabase/seed-employees.sql`
3. Paste and click **Run**
4. You should see 3 employee records created

---

## Step 4: Start the Application

### 4.1 Install Dependencies (if not done)
```bash
npm install
```

### 4.2 Start Dev Server
```bash
npm run dev
```

### 4.3 Open in Browser
Navigate to: http://localhost:5173

---

## 🔐 Login Credentials

### Administrator Access
```
Email: admin@miracle.com
Password: Admin@123456
```
**Permissions:**
- View all employees
- Add new employees
- Edit employee details
- Delete employees
- Full dashboard access

### Employee Access (User 1)
```
Email: employee1@miracle.com
Password: Employee@123
```
**Permissions:**
- View own profile
- View other employees (read-only)
- Employee portal access

### Employee Access (User 2)
```
Email: employee2@miracle.com
Password: Employee@123
```
**Permissions:**
- View own profile
- View other employees (read-only)
- Employee portal access

---

## 🧪 Testing the Application

1. **Login as Admin:**
   - Use admin credentials
   - You should see the admin dashboard with sidebar
   - Test adding a new employee
   - Test editing employee information
   - Test deleting an employee

2. **Login as Employee:**
   - Logout from admin account
   - Login with employee credentials
   - You should see a simplified employee portal
   - Verify you can only view information (no edit/delete buttons)

---

## 🔧 Troubleshooting

### Issue: Blank page after login
- Check browser console for errors
- Verify `.env` file has correct Supabase credentials
- Restart dev server: `npm run dev`

### Issue: "Invalid login credentials"
- Verify users were created in Supabase Auth
- Check email/password match exactly
- Ensure "Auto Confirm User" was checked

### Issue: "Cannot read properties of null"
- Verify `seed-employees.sql` was run successfully
- Check if employee records exist: Go to Supabase → Table Editor → employees

### Issue: Admin can't see dashboard
- Verify the admin user has `role = 'admin'` in employees table
- Check RLS policies were created correctly

---

## 📊 Database Structure

### Tables
- **employees** - Stores all employee data

### Key Columns
- `user_id` - Links to Supabase Auth user
- `role` - Either 'admin' or 'employee'
- `name`, `email`, `phone` - Employee details

### Security
- Row Level Security (RLS) enabled
- Admins: Full CRUD access
- Employees: Read-only access

---

## 🛡️ Security Notes

⚠️ **Important for Production:**
1. Change all default passwords immediately
2. Use strong, unique passwords
3. Enable MFA in Supabase for admin accounts
4. Review and adjust RLS policies as needed
5. Never commit `.env` file to version control
6. Use Supabase's built-in security features

---

## 📞 Support

If you encounter issues:
1. Check Supabase project logs
2. Review browser console for errors
3. Verify all migration scripts ran successfully
4. Ensure environment variables are set correctly

---

## ✅ Verification Checklist

- [ ] Supabase project created
- [ ] API credentials copied to `.env`
- [ ] Migration script executed successfully
- [ ] 3 auth users created (1 admin, 2 employees)
- [ ] Seed script executed successfully
- [ ] Dev server running on port 5173
- [ ] Can login with admin credentials
- [ ] Can login with employee credentials
- [ ] Admin sees full dashboard
- [ ] Employee sees limited portal

---

**You're all set! 🎉**

Login with the credentials above and start exploring the application.
