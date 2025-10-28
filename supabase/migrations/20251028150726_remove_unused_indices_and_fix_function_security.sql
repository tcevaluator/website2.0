/*
  # Fix Security Issues - Remove Unused Indices and Fix Function Search Path

  ## Changes Made
  
  1. **Remove Unused Indices**
     - Drop `idx_nacada_email` index on nacada_submissions.email
     - Drop `idx_nacada_created_at` index on nacada_submissions.created_at  
     - Drop `idx_nacada_institution` index on nacada_submissions.institution
     - These indices are not being used by any queries and add unnecessary overhead

  2. **Fix Function Security Issue**
     - Recreate `update_updated_at_column` function with immutable search_path
     - Set `search_path` to empty string to prevent search path injection attacks
     - This ensures the function always references objects using fully qualified names
     - Maintains same functionality while improving security posture

  ## Security Impact
  
  - **Performance**: Removing unused indices reduces write overhead and storage
  - **Security**: Fixed search_path vulnerability prevents potential SQL injection via search path manipulation
  - **Maintenance**: Cleaner database schema with only actively used indices

  ## Notes
  
  - The function continues to work identically for triggers on purchases and nacada_submissions tables
  - No application code changes required
  - All existing triggers remain functional
*/

-- Remove unused indices from nacada_submissions table
DROP INDEX IF EXISTS idx_nacada_email;
DROP INDEX IF EXISTS idx_nacada_created_at;
DROP INDEX IF EXISTS idx_nacada_institution;

-- Drop and recreate the function with secure search_path
DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Recreate triggers for tables that use this function
DROP TRIGGER IF EXISTS update_purchases_updated_at ON purchases;
CREATE TRIGGER update_purchases_updated_at
  BEFORE UPDATE ON purchases
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_nacada_submissions_updated_at ON nacada_submissions;
CREATE TRIGGER update_nacada_submissions_updated_at
  BEFORE UPDATE ON nacada_submissions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
