import { api, APIError } from "encore.dev/api";
import { authDB } from "./db";
import bcrypt from "bcrypt";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: {
    id: string;
    email: string;
    role: string;
  };
}

export interface User {
  id: string;
  email: string;
  password_hash: string;
  role: string;
  locked_until: Date | null;
}

// Login with existing account
export const login = api<LoginRequest, LoginResponse>(
  { expose: true, method: "POST", path: "/auth/login" },
  async (req) => {
    const user = await authDB.queryRow<User>`
      SELECT id, email, password_hash, role, locked_until 
      FROM users 
      WHERE email = ${req.email}
    `;

    if (!user) {
      throw APIError.unauthenticated("Invalid credentials");
    }

    if (user.locked_until && user.locked_until > new Date()) {
      throw APIError.resourceExhausted("Account locked");
    }

    const isValid = await bcrypt.compare(req.password, user.password_hash);
    if (!isValid) {
      throw APIError.unauthenticated("Invalid credentials");
    }

    // Create session
    const session = await authDB.queryRow<{ id: string }>`
      INSERT INTO sessions (user_id, expires_at)
      VALUES (${user.id}, ${new Date(Date.now() + 24 * 60 * 60 * 1000)})
      RETURNING id
    `;

    // Log audit
    await authDB.exec`
      INSERT INTO audit_logs (user_id, action, meta)
      VALUES (${user.id}, 'login_success', ${JSON.stringify({ email: user.email })})
    `;

    return {
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    };
  }
);
