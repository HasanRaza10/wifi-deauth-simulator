import { api, APIError } from "encore.dev/api";
import { authDB } from "./db";

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
    // Mock login for development - accept the demo credentials
    if (req.email === "user@example.com" && req.password === "DevOnlyPassword!234") {
      return {
        user: {
          id: "00000000-0000-0000-0000-000000000001",
          email: req.email,
          role: "user",
        },
      };
    }

    // For any other credentials, return invalid credentials error
    throw APIError.unauthenticated("Invalid credentials");
  }
);
