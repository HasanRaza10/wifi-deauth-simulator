import { api } from "encore.dev/api";

export interface UpdateProfileRequest {
  theme: "light" | "dark";
}

export interface UpdateProfileResponse {
  ok: boolean;
}

// Update user profile
export const updateProfile = api<UpdateProfileRequest, UpdateProfileResponse>(
  { expose: true, method: "PATCH", path: "/me" },
  async (req) => {
    // In real app, update database with user's theme preference
    console.log(`Theme updated to: ${req.theme}`);
    
    return { ok: true };
  }
);
