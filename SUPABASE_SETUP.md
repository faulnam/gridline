# Supabase Setup Guide for Gridline Digital

## 1. Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Fill in:
   - Project Name: `gridline-digital`
   - Database Password: (create a strong password)
   - Region: Choose closest to your users
5. Click "Create new project"

## 2. Create Database Table

Once your project is created, go to the SQL Editor and run this SQL:

```sql
-- Create leads table
CREATE TABLE leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  business_type TEXT NOT NULL,
  needs TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX idx_leads_email ON leads(email);

-- Enable Row Level Security (RLS)
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anonymous inserts (no login required)
CREATE POLICY "Allow anonymous inserts" ON leads
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create policy to allow authenticated users to read all leads
CREATE POLICY "Allow authenticated reads" ON leads
  FOR SELECT
  TO authenticated
  USING (true);

-- Optional: Create a function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_leads_updated_at
  BEFORE UPDATE ON leads
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

## 3. Get API Credentials

1. Go to Project Settings (gear icon in sidebar)
2. Click on "API" section
3. Copy these values:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public key**: `eyJhbGc...` (long string)

## 4. Configure Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add your credentials:
   ```
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

3. **IMPORTANT**: Never commit `.env` to git (already in .gitignore)

## 5. Test the Integration

1. Start your dev server:
   ```bash
   npm run dev
   ```

2. Go to Contact page and submit a test form

3. Check Supabase Dashboard:
   - Go to Table Editor
   - Select `leads` table
   - You should see your test submission

## 6. View Leads Data

### Option A: Supabase Dashboard
1. Go to Table Editor in Supabase Dashboard
2. Click on `leads` table
3. View all submissions

### Option B: Create Admin Page (Optional)
You can create a simple admin page to view leads:

```javascript
import { supabase } from '../lib/supabase';

// Fetch all leads
const { data, error } = await supabase
  .from('leads')
  .select('*')
  .order('created_at', { ascending: false });
```

## 7. Email Notifications (Optional)

To get email notifications when someone submits the form:

### Option 1: Supabase Database Webhooks
1. Go to Database → Webhooks
2. Create new webhook
3. Set trigger: `INSERT` on `leads` table
4. Set webhook URL to your email service (e.g., Zapier, Make.com)

### Option 2: Supabase Edge Functions
Create a Supabase Edge Function to send emails via SendGrid, Resend, or similar.

## 8. Security Best Practices

✅ **Already Implemented:**
- Row Level Security (RLS) enabled
- Anonymous users can only INSERT (not read/update/delete)
- Only authenticated users can read leads data
- Environment variables for sensitive data

✅ **Additional Recommendations:**
- Set up rate limiting in Supabase Dashboard
- Enable email verification for admin users
- Use Supabase Auth for admin dashboard
- Monitor usage in Supabase Dashboard

## 9. Production Deployment

When deploying to production (Vercel, Netlify, etc.):

1. Add environment variables in your hosting platform:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

2. Build and deploy:
   ```bash
   npm run build
   ```

## 10. Troubleshooting

### Error: "Failed to submit"
- Check if Supabase URL and Key are correct in `.env`
- Verify RLS policies are set correctly
- Check browser console for detailed error

### Error: "relation 'leads' does not exist"
- Make sure you ran the SQL to create the table
- Check table name is exactly `leads` (lowercase)

### No data appearing in Supabase
- Check RLS policies allow anonymous inserts
- Verify network tab in browser for API calls
- Check Supabase logs in Dashboard

## Support

For issues:
- Supabase Docs: https://supabase.com/docs
- Supabase Discord: https://discord.supabase.com
