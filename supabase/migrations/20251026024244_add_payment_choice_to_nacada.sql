/*
  # Add payment choice field to NACADA submissions

  1. Changes
    - Add `payment_choice` column to track whether user chose to pay now or later
    - Values: 'now' or 'later'
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'nacada_submissions' AND column_name = 'payment_choice'
  ) THEN
    ALTER TABLE nacada_submissions ADD COLUMN payment_choice text;
  END IF;
END $$;
