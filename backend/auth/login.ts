import { api } from "encore.dev/api";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

// Simple login with demo credentials only
export const login = api<LoginRequest, LoginResponse>(
  { expose: true, method: "POST", path: "/auth/login" },
  async (req) => {
    // Accept the demo credentials
    if (req.email === "user@example.com" && req.password === "DevOnlyPassword!234") {
      return {
        user: {
          id: "00000000-0000-0000-0000-000000000001",
          name: "Demo User",
          email: req.email,
          role: "user",
        },
      };
    }

    // For demo purposes, accept any email ending with @example.com
    if (req.email.endsWith("@example.com")) {
      return {
        user: {
          id: "00000000-0000-0000-0000-000000000002",
          name: "Demo User",
          email: req.email,
          role: "user",
        },
      };
    }

    throw new Error("Invalid credentials - use user@example.com");
  }
);
