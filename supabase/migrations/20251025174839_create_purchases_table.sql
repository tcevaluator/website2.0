/*
  # Create purchases table for tracking Stripe transactions

  1. New Tables
    - `purchases`
      - `id` (uuid, primary key) - Unique identifier for each purchase record
      - `stripe_session_id` (text, unique) - Stripe checkout session ID
      - `stripe_customer_id` (text) - Stripe customer ID
      - `customer_email` (text) - Customer's email address
      - `plan_name` (text) - Name of the purchased plan (Starter, Professional, Enterprise)
      - `price_id` (text) - Stripe price ID
      - `amount` (integer) - Amount in cents
      - `currency` (text) - Currency code (e.g., usd)
      - `status` (text) - Payment status (succeeded, failed, pending)
      - `payment_status` (text) - Detailed payment status from Stripe
      - `created_at` (timestamptz) - When the record was created
      - `updated_at` (timestamptz) - When the record was last updated

  2. Security
    - Enable RLS on `purchases` table
    - Add policy for service role to manage all records (for webhook access)
    - No public access - this is admin-only data

  3. Notes
    - This table stores all purchase attempts for tracking and admin notifications
    - Webhook will insert/update records based on Stripe events
*/

CREATE TABLE IF NOT EXISTS purchases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  stripe_session_id text UNIQUE NOT NULL,
  stripe_customer_id text,
  customer_email text NOT NULL,
  plan_name text NOT NULL,
  price_id text NOT NULL,
  amount integer NOT NULL,
  currency text DEFAULT 'usd',
  status text NOT NULL,
  payment_status text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;

-- Service role can manage all records (used by webhook)
CREATE POLICY "Service role can manage all purchases"
  ON purchases
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);
