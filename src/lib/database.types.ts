export type UserRole = 'user' | 'warden' | 'admin';
export type BikeStatus = 'available' | 'rented' | 'maintenance';
export type BookingStatus = 'pending' | 'approved' | 'active' | 'returned' | 'rejected';

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  created_at: string;
}

export interface Bike {
  id: string;
  name: string;
  description: string | null;
  image_url: string | null;
  price_per_hour: number;
  status: BikeStatus;
  created_at: string;
}

export interface Booking {
  id: string;
  user_id: string;
  bike_id: string;
  start_time: string;
  end_time: string;
  expected_duration_hours: number;
  actual_return_time: string | null;
  status: BookingStatus;
  warden_approved: boolean;
  admin_approved: boolean;
  total_cost: number;
  overtime_charge: number;
  damage_charge: number;
  created_at: string;
}

export interface Receipt {
  id: string;
  booking_id: string;
  user_id: string;
  base_cost: number;
  overtime_charge: number;
  damage_charge: number;
  total_amount: number;
  created_at: string;
}

export interface DamageReport {
  id: string;
  booking_id: string;
  warden_id: string;
  description: string;
  charge_amount: number;
  created_at: string;
}

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Omit<Profile, 'created_at'>;
        Update: Partial<Omit<Profile, 'id' | 'created_at'>>;
      };
      bikes: {
        Row: Bike;
        Insert: Omit<Bike, 'id' | 'created_at'>;
        Update: Partial<Omit<Bike, 'id' | 'created_at'>>;
      };
      bookings: {
        Row: Booking;
        Insert: Omit<Booking, 'id' | 'created_at'>;
        Update: Partial<Omit<Booking, 'id' | 'created_at'>>;
      };
      receipts: {
        Row: Receipt;
        Insert: Omit<Receipt, 'id' | 'created_at'>;
        Update: Partial<Omit<Receipt, 'id' | 'created_at'>>;
      };
      damage_reports: {
        Row: DamageReport;
        Insert: Omit<DamageReport, 'id' | 'created_at'>;
        Update: Partial<Omit<DamageReport, 'id' | 'created_at'>>;
      };
    };
  };
}
