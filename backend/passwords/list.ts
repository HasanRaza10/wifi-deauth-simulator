import { api } from "encore.dev/api";
import { authDB } from "../auth/db";

export interface SavedPassword {
  id: string;
  domain: string;
  created_at: string;
}

export interface SavedPasswordsRequest {
  user_id: string;
}

export interface SavedPasswordsResponse {
  passwords: SavedPassword[];
}

// List saved passwords (without plaintext)
export const listPasswords = api<SavedPasswordsRequest, SavedPasswordsResponse>(
  { expose: true, method: "POST", path: "/passwords/list" },
  async (req) => {
    const passwords = await authDB.queryAll<SavedPassword>`
      SELECT id, domain, created_at
      FROM saved_passwords
      WHERE user_id = ${req.user_id}
      ORDER BY created_at DESC
    `;

    return { passwords };
  }
);
