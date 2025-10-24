/*
  # Add INSERT policy for demo submissions

  1. Changes
    - Add policy to allow anonymous users to insert demo submissions
    - This allows the public demo form to work without authentication

  2. Security
    - Policy allows INSERT for all users (public form)
    - Existing SELECT policy remains restrictive (authenticated only)
*/

CREATE POLICY "Allow public to submit demo requests"
  ON demo_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);
