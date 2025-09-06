import { api } from "encore.dev/api";

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

// Mock saved passwords for demo
export const listPasswords = api<SavedPasswordsRequest, SavedPasswordsResponse>(
  { expose: true, method: "POST", path: "/passwords/list" },
  async (req) => {
    // Return mock saved passwords
    const mockPasswords: SavedPassword[] = [
      {
        id: "pwd_001",
        domain: "github.com",
        created_at: new Date(Date.now() - 86400000).toISOString(),
      },
      {
        id: "pwd_002", 
        domain: "google.com",
        created_at: new Date(Date.now() - 172800000).toISOString(),
      },
    ];

    return { passwords: mockPasswords };
  }
);
