import { api } from "encore.dev/api";
import { authDB } from "../auth/db";
import crypto from "crypto";

export interface SavePasswordRequest {
  user_id: string;
  domain: string;
  password: string;
}

export interface SavePasswordResponse {
  id: string;
  domain: string;
  created_at: string;
}

// Save password to encrypted vault
export const savePassword = api<SavePasswordRequest, SavePasswordResponse>(
  { expose: true, method: "POST", path: "/passwords/save" },
  async (req) => {
    // Encrypt password (simplified - in production use proper key management)
    const key = crypto.randomBytes(32);
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipher('aes-256-gcm', key);
    let encrypted = cipher.update(req.password, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    const result = await authDB.queryRow<{ id: string; created_at: string }>`
      INSERT INTO saved_passwords (user_id, domain, ciphertext)
      VALUES (${req.user_id}, ${req.domain}, ${Buffer.from(encrypted, 'hex')})
      RETURNING id, created_at
    `;

    if (!result) {
      throw new Error("Failed to save password");
    }

    return {
      id: result.id,
      domain: req.domain,
      created_at: result.created_at,
    };
  }
);
