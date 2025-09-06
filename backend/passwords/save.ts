import { api } from "encore.dev/api";

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

// Mock password saving for demo
export const savePassword = api<SavePasswordRequest, SavePasswordResponse>(
  { expose: true, method: "POST", path: "/passwords/save" },
  async (req) => {
    // Generate mock response
    const id = `pwd_${Date.now()}`;
    
    return {
      id,
      domain: req.domain,
      created_at: new Date().toISOString(),
    };
  }
);
