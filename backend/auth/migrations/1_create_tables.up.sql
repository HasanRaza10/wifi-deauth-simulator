-- Simplified schema for demo purposes
CREATE TABLE demo_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Insert demo user
INSERT INTO demo_users (id, name, email) VALUES 
('00000000-0000-0000-0000-000000000001', 'Demo User', 'user@example.com');
