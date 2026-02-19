/*
  Bike Reservation System Schema - UPDATED VERSION
  Fixes:
  ✔ Auto-create profile on signup
  ✔ Secure profile access
  ✔ Prevent 403 errors
*/

-- Enable required extension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

----------------------------------------------------
-- PROFILES TABLE
----------------------------------------------------

CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text DEFAULT '',
  role text NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'warden', 'admin')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

----------------------------------------------------
-- AUTO CREATE PROFILE WHEN USER SIGNS UP
----------------------------------------------------

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    'user'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE PROCEDURE public.handle_new_user();

----------------------------------------------------
-- BIKES TABLE
----------------------------------------------------

CREATE TABLE IF NOT EXISTS bikes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  image_url text,
  price_per_hour numeric NOT NULL DEFAULT 10,
  status text NOT NULL DEFAULT 'available'
    CHECK (status IN ('available', 'rented', 'maintenance')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE bikes ENABLE ROW LEVEL SECURITY;

----------------------------------------------------
-- BOOKINGS TABLE
----------------------------------------------------

CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  bike_id uuid NOT NULL REFERENCES bikes(id) ON DELETE CASCADE,
  start_time timestamptz NOT NULL,
  end_time timestamptz NOT NULL,
  expected_duration_hours numeric NOT NULL,
  actual_return_time timestamptz,
  status text NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'approved', 'active', 'returned', 'rejected')),
  warden_approved boolean DEFAULT false,
  admin_approved boolean DEFAULT false,
  total_cost numeric DEFAULT 0,
  overtime_charge numeric DEFAULT 0,
  damage_charge numeric DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

----------------------------------------------------
-- RECEIPTS TABLE
----------------------------------------------------

CREATE TABLE IF NOT EXISTS receipts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  base_cost numeric NOT NULL,
  overtime_charge numeric DEFAULT 0,
  damage_charge numeric DEFAULT 0,
  total_amount numeric NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE receipts ENABLE ROW LEVEL SECURITY;

----------------------------------------------------
-- DAMAGE REPORTS TABLE
----------------------------------------------------

CREATE TABLE IF NOT EXISTS damage_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  warden_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  description text NOT NULL,
  charge_amount numeric NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE damage_reports ENABLE ROW LEVEL SECURITY;

----------------------------------------------------
-- PROFILES POLICIES (SECURE VERSION)
----------------------------------------------------

DROP POLICY IF EXISTS "Users can view all profiles" ON profiles;

CREATE POLICY "Users can view own profile or staff"
ON profiles FOR SELECT
TO authenticated
USING (
  auth.uid() = id OR
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role IN ('admin', 'warden')
  )
);

CREATE POLICY "Users can update own profile"
ON profiles FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

----------------------------------------------------
-- BIKES POLICIES
----------------------------------------------------

CREATE POLICY "Anyone can view bikes"
ON bikes FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Admin and warden can update bikes"
ON bikes FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role IN ('admin', 'warden')
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role IN ('admin', 'warden')
  )
);

CREATE POLICY "Admin can insert bikes"
ON bikes FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'admin'
  )
);

----------------------------------------------------
-- BOOKINGS POLICIES
----------------------------------------------------

CREATE POLICY "Users can view own bookings or staff"
ON bookings FOR SELECT
TO authenticated
USING (
  auth.uid() = user_id OR
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role IN ('admin', 'warden')
  )
);

CREATE POLICY "Users can create own bookings"
ON bookings FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users and staff can update bookings"
ON bookings FOR UPDATE
TO authenticated
USING (
  auth.uid() = user_id OR
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role IN ('admin', 'warden')
  )
)
WITH CHECK (
  auth.uid() = user_id OR
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role IN ('admin', 'warden')
  )
);

----------------------------------------------------
-- RECEIPTS POLICIES
----------------------------------------------------

CREATE POLICY "Users can view own receipts or staff"
ON receipts FOR SELECT
TO authenticated
USING (
  auth.uid() = user_id OR
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role IN ('admin', 'warden')
  )
);

CREATE POLICY "Authenticated can insert receipts"
ON receipts FOR INSERT
TO authenticated
WITH CHECK (true);

----------------------------------------------------
-- DAMAGE REPORTS POLICIES
----------------------------------------------------

CREATE POLICY "Users can view related damage reports"
ON damage_reports FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM bookings
    WHERE bookings.id = damage_reports.booking_id
    AND bookings.user_id = auth.uid()
  )
  OR
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role IN ('admin', 'warden')
  )
);

CREATE POLICY "Wardens and admin can create damage reports"
ON damage_reports FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role IN ('admin', 'warden')
  )
);

----------------------------------------------------
-- INDEXES
----------------------------------------------------

CREATE INDEX IF NOT EXISTS idx_bookings_user_id ON bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_bookings_bike_id ON bookings(bike_id);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_receipts_booking_id ON receipts(booking_id);
CREATE INDEX IF NOT EXISTS idx_damage_reports_booking_id ON damage_reports(booking_id);
