import { api } from "encore.dev/api";
import { authDB } from "../auth/db";

export interface SavedPassword {
  id: string;
  domain: string;
  created_at: string;
}

export interface SavedPasswordsResponse {
  passwords: SavedPassword[];
}

// List saved passwords (without plaintext)
export const listPasswords = api<void, SavedPasswordsResponse>(
  { expose: true, method: "GET", path: "/passwords/list" },
  async () => {
    // In a real app, you'd get user_id from auth context
    const userId = "00000000-0000-0000-0000-000000000001"; // Mock user ID

    const passwords = await authDB.queryAll<SavedPassword>`
      SELECT id, domain, created_at
      FROM saved_passwords
      WHERE user_id = ${userId}
      ORDER BY created_at DESC
    `;

    return { passwords };
  }
);
