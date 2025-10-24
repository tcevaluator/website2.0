/*
  # Create demo_submissions table

  1. New Tables
    - `demo_submissions`
      - `id` (uuid, primary key) - Unique identifier for each submission
      - `first_name` (text) - Contact's first name
      - `last_name` (text) - Contact's last name
      - `email` (text) - Contact's email address
      - `phone` (text) - Contact's phone number
      - `institution` (text) - Name of the institution
      - `role` (text) - Contact's role/title
      - `students_per_year` (text) - Number of students per year
      - `message` (text) - Additional message from the contact
      - `hubspot_submitted` (boolean) - Whether submission was sent to HubSpot
      - `hubspot_error` (text, nullable) - Any error from HubSpot submission
      - `created_at` (timestamptz) - Timestamp of submission
      
  2. Security
    - Enable RLS on `demo_submissions` table
    - Add policy for service role to insert submissions (backend only)
    - No public access to prevent data exposure
*/

CREATE TABLE IF NOT EXISTS demo_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  institution text NOT NULL,
  role text NOT NULL,
  students_per_year text NOT NULL,
  message text DEFAULT '',
  hubspot_submitted boolean DEFAULT false,
  hubspot_error text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE demo_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role can insert demo submissions"
  ON demo_submissions
  FOR INSERT
  TO service_role
  WITH CHECK (true);

CREATE POLICY "Service role can read demo submissions"
  ON demo_submissions
  FOR SELECT
  TO service_role
  USING (true);