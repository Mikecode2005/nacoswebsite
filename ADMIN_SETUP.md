# How to Add Administrator Users

To add administrator privileges to users in your NACOS website, follow these steps:

## Prerequisites
- Access to your Supabase project dashboard
- The user must already be registered in your application

## Steps to Add an Admin

### 1. Log into Supabase Dashboard
Navigate to your Supabase project at: https://supabase.com/dashboard/project/vpspjbapdhufjhxvbbov

### 2. Go to Table Editor
1. Click on "Table Editor" in the left sidebar
2. Select the `user_roles` table

### 3. Find the User ID
First, you need to get the user's ID:
1. Go to the `profiles` table
2. Find the user by their email address
3. Copy their `user_id` (it's a UUID that looks like: `123e4567-e89b-12d3-a456-426614174000`)

### 4. Update User Role
1. Go back to the `user_roles` table
2. Find the row with the user's `user_id`
3. Click on the `role` field for that user
4. Change it from `student` to one of these options:
   - `admin` - Full administrative access
   - `superadmin` - Highest level of access
   - `lecturer` - Access for faculty members

### 5. Verify the Change
1. Have the user log out and log back in
2. They should now see admin features like:
   - Admin Dashboard link in the header
   - Ability to create/delete quizzes
   - Ability to manage blog posts, events, gallery, etc.

## Available Roles

| Role | Description | Permissions |
|------|-------------|-------------|
| `student` | Default role for all users | View content, take quizzes, write blog posts |
| `lecturer` | Faculty members | Create quizzes, upload resources |
| `admin` | Site administrators | Full CRUD access to all content |
| `superadmin` | Super administrators | Highest level of access |

## Alternative: Using SQL

You can also update roles using SQL in the SQL Editor:

```sql
-- Update a specific user's role
UPDATE user_roles 
SET role = 'admin' 
WHERE user_id = 'USER_ID_HERE';

-- Or if you know their email, use a JOIN:
UPDATE user_roles 
SET role = 'admin' 
FROM profiles 
WHERE user_roles.user_id = profiles.user_id 
  AND profiles.email = 'user@example.com';
```

## Security Notes

⚠️ **Important Security Considerations:**
- Only trusted individuals should be given admin or superadmin roles
- Admins can delete content, manage users, and modify critical data
- Keep track of who has admin access
- Regularly audit user roles

## Troubleshooting

If the user doesn't have admin access after the change:
1. Ensure they logged out and back in
2. Check that the role was saved correctly in the `user_roles` table
3. Verify the `user_id` matches between `profiles` and `user_roles` tables
4. Clear browser cache and cookies

For additional support, check the application logs or contact the development team.
