import { api } from "encore.dev/api";

export interface LogoutResponse {
  ok: boolean;
}

// Logout user
export const logout = api<void, LogoutResponse>(
  { expose: true, method: "POST", path: "/auth/logout" },
  async () => {
    return { ok: true };
  }
);
