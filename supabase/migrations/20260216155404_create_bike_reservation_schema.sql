/*
  # Bike Reservation System Schema

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key, references auth.users)
      - `email` (text)
      - `full_name` (text)
      - `role` (text) - 'user', 'warden', or 'admin'
      - `created_at` (timestamptz)
    
    - `bikes`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `image_url` (text)
      - `price_per_hour` (numeric)
      - `status` (text) - 'available', 'rented', 'maintenance'
      - `created_at` (timestamptz)
    
    - `bookings`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `bike_id` (uuid, references bikes)
      - `start_time` (timestamptz)
      - `end_time` (timestamptz)
      - `expected_duration_hours` (numeric)
      - `actual_return_time` (timestamptz, nullable)
      - `status` (text) - 'pending', 'approved', 'active', 'returned', 'rejected'
      - `warden_approved` (boolean)
      - `admin_approved` (boolean)
      - `total_cost` (numeric)
      - `overtime_charge` (numeric)
      - `damage_charge` (numeric)
      - `created_at` (timestamptz)
    
    - `receipts`
      - `id` (uuid, primary key)
      - `booking_id` (uuid, references bookings)
      - `user_id` (uuid, references profiles)
      - `base_cost` (numeric)
      - `overtime_charge` (numeric)
      - `damage_charge` (numeric)
      - `total_amount` (numeric)
      - `created_at` (timestamptz)
    
    - `damage_reports`
      - `id` (uuid, primary key)
      - `booking_id` (uuid, references bookings)
      - `warden_id` (uuid, references profiles)
      - `description` (text)
      - `charge_amount` (numeric)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for role-based access control
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text NOT NULL,
  role text NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'warden', 'admin')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create bikes table
CREATE TABLE IF NOT EXISTS bikes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  image_url text,
  price_per_hour numeric NOT NULL DEFAULT 10,
  status text NOT NULL DEFAULT 'available' CHECK (status IN ('available', 'rented', 'maintenance')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE bikes ENABLE ROW LEVEL SECURITY;

-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  bike_id uuid NOT NULL REFERENCES bikes(id) ON DELETE CASCADE,
  start_time timestamptz NOT NULL,
  end_time timestamptz NOT NULL,
  expected_duration_hours numeric NOT NULL,
  actual_return_time timestamptz,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'active', 'returned', 'rejected')),
  warden_approved boolean DEFAULT false,
  admin_approved boolean DEFAULT false,
  total_cost numeric DEFAULT 0,
  overtime_charge numeric DEFAULT 0,
  damage_charge numeric DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Create receipts table
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

-- Create damage_reports table
CREATE TABLE IF NOT EXISTS damage_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  warden_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  description text NOT NULL,
  charge_amount numeric NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE damage_reports ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view all profiles"
  ON profiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Bikes policies
CREATE POLICY "Anyone can view available bikes"
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

-- Bookings policies
CREATE POLICY "Users can view own bookings"
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

-- Receipts policies
CREATE POLICY "Users can view own receipts"
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

CREATE POLICY "System can create receipts"
  ON receipts FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Damage reports policies
CREATE POLICY "Users can view own damage reports"
  ON damage_reports FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM bookings
      WHERE bookings.id = damage_reports.booking_id
      AND bookings.user_id = auth.uid()
    ) OR
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'warden')
    )
  );

CREATE POLICY "Wardens can create damage reports"
  ON damage_reports FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'warden')
    )
  );

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_bookings_user_id ON bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_bookings_bike_id ON bookings(bike_id);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_receipts_booking_id ON receipts(booking_id);
CREATE INDEX IF NOT EXISTS idx_damage_reports_booking_id ON damage_reports(booking_id);