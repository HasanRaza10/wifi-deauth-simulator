import { api, APIError } from "encore.dev/api";
import { authDB } from "./db";
import bcrypt from "bcrypt";

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

// Register new user account
export const register = api<RegisterRequest, RegisterResponse>(
  { expose: true, method: "POST", path: "/auth/register" },
  async (req) => {
    // Check if user already exists
    const existingUser = await authDB.queryRow`
      SELECT id FROM users WHERE email = ${req.email}
    `;

    if (existingUser) {
      throw APIError.alreadyExists("User with this email already exists");
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.password, saltRounds);

    // Create user
    const user = await authDB.queryRow<{ id: string; name: string; email: string; role: string }>`
      INSERT INTO users (name, email, password_hash, role)
      VALUES (${req.name}, ${req.email}, ${hashedPassword}, 'user')
      RETURNING id, name, email, role
    `;

    if (!user) {
      throw APIError.internal("Failed to create user");
    }

    // Log audit
    await authDB.exec`
      INSERT INTO audit_logs (user_id, action, meta)
      VALUES (${user.id}, 'user_registered', ${JSON.stringify({ email: user.email, name: user.name })})
    `;

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }
);
