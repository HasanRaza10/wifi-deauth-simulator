import { api } from "encore.dev/api";

export interface UserProfile {
  id: string;
  email: string;
  role: "user" | "admin";
  theme: "light" | "dark";
}

// Get current user profile
export const getProfile = api<void, UserProfile>(
  { expose: true, method: "GET", path: "/me" },
  async () => {
    // Mock user profile - in real app, get from auth context
    return {
      id: "00000000-0000-0000-0000-000000000001",
      email: "user@example.com",
      role: "user",
      theme: "light",
    };
  }
);
