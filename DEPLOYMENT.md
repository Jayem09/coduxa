# Coduxa Platform - Vercel Deployment Guide

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub Repository**: Push your code to GitHub
3. **Supabase Project**: Set up your Supabase database
4. **Environment Variables**: Gather all required API keys

## Step 1: Prepare Your Repository

1. **Push to GitHub**:

   ```bash
   git add .
   git commit -m "Prepare for Vercel deployment"
   git push origin main
   ```

2. **Verify Files**: Ensure these files are in your repository:
   - `vercel.json` ✅
   - `package.json` (with updated scripts) ✅
   - `env.example` ✅

## Step 2: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard

1. **Go to [vercel.com](https://vercel.com)** and sign in
2. **Click "New Project"**
3. **Import your GitHub repository**
4. **Configure the project**:
   - Framework Preset: `Vite`
   - Root Directory: `./` (default)
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

### Option B: Deploy via Vercel CLI

1. **Install Vercel CLI**:

   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:

   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel
   ```

## Step 3: Configure Environment Variables

In your Vercel dashboard, go to **Settings > Environment Variables** and add:

### Required Variables:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
VITE_SERVER_URL=https://your-app-name.vercel.app
XENDIT_SECRET_KEY=your_xendit_secret_key
XENDIT_WEBHOOK_TOKEN=your_xendit_webhook_token
RESEND_API_KEY=your_resend_api_key
FRONTEND_URL=https://your-app-name.vercel.app
```

### How to get these values:

1. **Supabase**:

   - Go to your Supabase project dashboard
   - Settings > API
   - Copy URL and keys

2. **Xendit**:

   - Go to Xendit dashboard
   - API Keys section
   - Copy secret key and webhook token

3. **Resend**:
   - Go to Resend dashboard
   - API Keys section
   - Copy API key

## Step 4: Update Supabase Database

1. **Run the SQL script** in your Supabase SQL Editor:

   - Copy contents of `add_payments_tables.sql`
   - Paste and run in Supabase SQL Editor

2. **Verify tables exist**:
   - `payments` table
   - `activity_log` table

## Step 5: Configure Webhooks

### Xendit Webhook:

- **URL**: `https://your-app-name.vercel.app/xendit-webhook`
- **Events**: Select payment events

### Update CORS in Supabase:

- Go to Supabase > Settings > API
- Add your Vercel domain to allowed origins

## Step 6: Test Your Deployment

1. **Visit your Vercel URL**
2. **Test key features**:
   - User registration/login
   - Exam taking
   - Credit purchase
   - Admin dashboard

## Step 7: Custom Domain (Optional)

1. **In Vercel dashboard**: Go to Settings > Domains
2. **Add your domain**: e.g., `coduxa.com`
3. **Update DNS**: Point your domain to Vercel
4. **Update environment variables**: Change URLs to use your custom domain

## Troubleshooting

### Common Issues:

1. **Build Fails**:

   - Check Node.js version (should be 18+)
   - Verify all dependencies are in `package.json`

2. **API Routes Not Working**:

   - Check `vercel.json` configuration
   - Verify environment variables are set

3. **Database Connection Issues**:

   - Verify Supabase URL and keys
   - Check RLS policies

4. **CORS Errors**:
   - Update `FRONTEND_URL` environment variable
   - Check Supabase allowed origins

### Useful Commands:

```bash
# Check build locally
npm run build

# Test server locally
npm run server

# View Vercel logs
vercel logs

# Redeploy
vercel --prod
```

## Post-Deployment Checklist

- [ ] Frontend loads correctly
- [ ] User authentication works
- [ ] Exams can be taken
- [ ] Credits system functions
- [ ] Admin dashboard displays data
- [ ] Payment webhooks work
- [ ] Email notifications send
- [ ] All responsive design works

## Support

If you encounter issues:

1. Check Vercel function logs
2. Verify environment variables
3. Test API endpoints individually
4. Check Supabase logs

Your Coduxa platform should now be live on Vercel! 🚀
