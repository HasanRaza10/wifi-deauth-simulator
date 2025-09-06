import { api } from "encore.dev/api";

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

// Simple registration for demo accounts
export const register = api<RegisterRequest, RegisterResponse>(
  { expose: true, method: "POST", path: "/auth/register" },
  async (req) => {
    // Only allow @example.com emails for demo
    if (!req.email.endsWith("@example.com")) {
      throw new Error("Only @example.com emails allowed for demo");
    }

    // Generate a simple demo user
    const userId = `demo-${Date.now()}`;
    
    return {
      user: {
        id: userId,
        name: req.name,
        email: req.email,
        role: "user",
      },
    };
  }
);
