/*
  # Create NACADA LOI submissions table

  1. New Tables
    - `nacada_submissions`
      - `id` (uuid, primary key) - Unique identifier
      - `institution` (text) - Institution name
      - `signature` (text) - Digital signature
      - `name` (text) - Full name of signatory
      - `title` (text) - Job title
      - `date` (date) - Date of submission
      - `email` (text) - Contact email
      - `created_at` (timestamptz) - Timestamp of submission
      - `updated_at` (timestamptz) - Last update timestamp

  2. Security
    - Enable RLS on `nacada_submissions` table
    - Add policy for public insert (anyone can submit)
    - Add policy for authenticated read (only authenticated users can view submissions)

  3. Indexes
    - Add index on email for faster lookups
    - Add index on created_at for sorting
*/

-- Create nacada_submissions table
CREATE TABLE IF NOT EXISTS nacada_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  institution text NOT NULL,
  signature text NOT NULL,
  name text NOT NULL,
  title text NOT NULL,
  date date NOT NULL,
  email text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE nacada_submissions ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anyone to insert (public form submission)
CREATE POLICY "Anyone can submit NACADA LOI"
  ON nacada_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy: Only authenticated users can view submissions
CREATE POLICY "Authenticated users can view NACADA submissions"
  ON nacada_submissions
  FOR SELECT
  TO authenticated
  USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_nacada_email ON nacada_submissions(email);
CREATE INDEX IF NOT EXISTS idx_nacada_created_at ON nacada_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_nacada_institution ON nacada_submissions(institution);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_nacada_submissions_updated_at
  BEFORE UPDATE ON nacada_submissions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
