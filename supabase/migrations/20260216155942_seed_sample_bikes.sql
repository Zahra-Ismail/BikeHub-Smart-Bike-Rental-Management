/*
  # Seed Sample Bikes

  1. Data
    - Insert sample bikes with different price points
    - All bikes set to available status

  2. Notes
    - This migration uses image URLs from Pexels for sample bikes
    - Helps demonstrate the bike browsing functionality
*/

INSERT INTO bikes (name, description, image_url, price_per_hour, status)
VALUES
  (
    'Mountain Explorer',
    'Perfect for off-road adventures with full suspension and durable frame',
    'https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg?auto=compress&cs=tinysrgb&w=800',
    15,
    'available'
  ),
  (
    'City Cruiser',
    'Comfortable urban bike ideal for daily commutes and city exploration',
    'https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg?auto=compress&cs=tinysrgb&w=800',
    10,
    'available'
  ),
  (
    'Speed Racer',
    'High-performance road bike for speed enthusiasts',
    'https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg?auto=compress&cs=tinysrgb&w=800',
    20,
    'available'
  ),
  (
    'Electric Glide',
    'E-bike with pedal assist for effortless rides',
    'https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg?auto=compress&cs=tinysrgb&w=800',
    25,
    'available'
  ),
  (
    'Family Tandem',
    'Two-seater bike perfect for couples or parent-child rides',
    'https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg?auto=compress&cs=tinysrgb&w=800',
    18,
    'available'
  )
ON CONFLICT DO NOTHING;
