# TC Evaluator Setup Guide

This guide will help you configure HubSpot and Stripe integrations for your TC Evaluator website.

## Table of Contents
- [HubSpot Integration](#hubspot-integration)
- [Stripe Integration](#stripe-integration)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)

---

## HubSpot Integration

HubSpot is used to capture demo requests from the "Book a Demo" page.

### Step 1: Create a HubSpot Account
1. Go to [HubSpot](https://www.hubspot.com/) and sign up for a free account
2. Complete the onboarding process

### Step 2: Create a Form
1. Navigate to **Marketing** → **Lead Capture** → **Forms**
2. Click **Create form**
3. Choose **Embedded form**
4. Add the following fields:
   - First Name (`firstname`)
   - Last Name (`lastname`)
   - Email (`email`)
   - Phone Number (`phone`)
   - Company Name (`company`)
   - Job Title (`jobtitle`)
   - Create a custom field: `students_per_year` (dropdown)
   - Message (`message`)

### Step 3: Get Your Credentials
1. After creating the form, click on the form name
2. Click **Actions** → **Share**
3. In the embed code, find:
   - **Portal ID**: Look for `portalId: 'YOUR_PORTAL_ID'`
   - **Form ID**: Look for `formId: 'YOUR_FORM_ID'`

### Step 4: Update Environment Variables
Add these to your `.env` file:
```bash
VITE_HUBSPOT_PORTAL_ID=your_portal_id_here
VITE_HUBSPOT_FORM_ID=your_form_id_here
```

---

## Stripe Integration

Stripe is used to process subscription payments on the Pricing page.

### Step 1: Create a Stripe Account
1. Go to [Stripe Dashboard](https://dashboard.stripe.com/register)
2. Complete the registration process
3. Use **Test Mode** for development

### Step 2: Get API Keys
1. In Stripe Dashboard, navigate to **Developers** → **API keys**
2. Copy your:
   - **Publishable key** (starts with `pk_test_`)
   - **Secret key** (starts with `sk_test_`)

### Step 3: Create Products and Prices
1. Navigate to **Products** → **Add product**
2. Create two products:

#### Starter Plan
- Name: `TC Evaluator - Starter`
- Description: `Up to 500 evaluations per month`
- Pricing: **Recurring** → **Monthly** → `$2,500.00`
- Copy the **Price ID** (starts with `price_`)

#### Professional Plan
- Name: `TC Evaluator - Professional`
- Description: `Up to 2,500 evaluations per month`
- Pricing: **Recurring** → **Monthly** → `$6,500.00`
- Copy the **Price ID** (starts with `price_`)

### Step 4: Update Environment Variables
Add these to your `.env` file:
```bash
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
VITE_STRIPE_SECRET_KEY=sk_test_your_key_here
VITE_STRIPE_STARTER_PRICE_ID=price_starter_id_here
VITE_STRIPE_PROFESSIONAL_PRICE_ID=price_professional_id_here
```

### Step 5: Deploy Stripe Edge Function
The Stripe checkout is handled by a Supabase Edge Function. Deploy it:

```bash
# The function is already created at:
# supabase/functions/create-checkout-session/index.ts

# You'll need to add the STRIPE_SECRET_KEY to your Supabase project
```

In your Supabase Dashboard:
1. Go to **Settings** → **Edge Functions** → **Secrets**
2. Add: `STRIPE_SECRET_KEY` with your Stripe secret key

---

## Environment Variables

Your complete `.env` file should look like this:

```bash
# Supabase (already configured)
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# HubSpot Configuration
VITE_HUBSPOT_PORTAL_ID=your_portal_id_here
VITE_HUBSPOT_FORM_ID=your_form_id_here

# Stripe Configuration
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
VITE_STRIPE_SECRET_KEY=sk_test_your_key_here

# Stripe Price IDs
VITE_STRIPE_STARTER_PRICE_ID=price_starter_id_here
VITE_STRIPE_PROFESSIONAL_PRICE_ID=price_professional_id_here
```

---

## Testing

### Test HubSpot Integration
1. Navigate to `/book-demo`
2. Fill out and submit the form
3. Check your HubSpot contacts to see if the submission appears

### Test Stripe Integration
1. Navigate to `/pricing`
2. Click "Get Started" on any plan
3. Use Stripe test card: `4242 4242 4242 4242`
   - Any future expiry date
   - Any 3-digit CVC
   - Any postal code
4. Complete the checkout
5. You should be redirected to `/success`
6. Check your Stripe Dashboard for the test subscription

---

## Deployment

### Before Deploying to Production:

1. **Switch Stripe to Live Mode:**
   - Get live API keys from Stripe Dashboard (toggle Test Mode OFF)
   - Create live products and prices
   - Update `.env` with live keys (they start with `pk_live_` and `sk_live_`)

2. **Configure HubSpot:**
   - Ensure your HubSpot form is published
   - Set up email notifications for new submissions

3. **Deploy Edge Function:**
   - Make sure the Stripe checkout Edge Function is deployed
   - Verify the STRIPE_SECRET_KEY is set in production

4. **Test Everything:**
   - Test the demo form submission
   - Make a small real purchase to verify payment flow
   - Refund the test purchase

---

## Troubleshooting

### HubSpot Form Not Submitting
- Check browser console for errors
- Verify Portal ID and Form ID are correct
- Ensure CORS is enabled in HubSpot settings

### Stripe Checkout Not Working
- Verify API keys are correct and for the right mode (test/live)
- Check that Price IDs match your Stripe products
- Ensure Edge Function is deployed with correct secret key
- Check browser console and network tab for errors

### Need Help?
- HubSpot Support: https://help.hubspot.com/
- Stripe Support: https://support.stripe.com/
- Supabase Docs: https://supabase.com/docs

---

## Security Notes

1. **Never commit real API keys** to version control
2. Use **test mode** in Stripe during development
3. Keep `.env` file in `.gitignore`
4. Use environment variables in production (Netlify, Vercel, etc.)
5. Stripe Secret Key should **only** be in the Edge Function environment

---

## Features Overview

### ✅ Navigation
- All pages linked with React Router
- Smooth client-side navigation
- Mobile responsive menu

### ✅ Book a Demo Page
- HubSpot form integration
- Real-time submission
- Success/error handling
- Loading states

### ✅ Pricing Page
- Three pricing tiers
- Stripe checkout integration
- ROI calculator
- Feature comparison table
- Add-on services
- FAQ section

### ✅ Payment Flow
1. User clicks "Get Started"
2. Creates Stripe checkout session
3. Redirects to Stripe hosted checkout
4. After payment, redirects to `/success`
5. Shows confirmation with next steps

---

Good luck with your TC Evaluator platform! 🚀
