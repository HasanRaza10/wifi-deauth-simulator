import { api } from "encore.dev/api";

export interface PasswordStrengthRequest {
  password: string;
}

export interface PasswordStrengthResponse {
  score: number;
  label: "very weak" | "weak" | "medium" | "strong" | "very strong";
  feedback: string[];
}

// Check password strength
export const checkStrength = api<PasswordStrengthRequest, PasswordStrengthResponse>(
  { expose: true, method: "POST", path: "/passwords/strength" },
  async (req) => {
    const password = req.password;
    let score = 0;
    const feedback: string[] = [];

    // Length check
    if (password.length >= 12) {
      score += 2;
    } else if (password.length >= 8) {
      score += 1;
    } else {
      feedback.push("Use at least 12 characters");
    }

    // Character variety
    if (/[a-z]/.test(password)) score += 1;
    else feedback.push("Include lowercase letters");

    if (/[A-Z]/.test(password)) score += 1;
    else feedback.push("Include uppercase letters");

    if (/\d/.test(password)) score += 1;
    else feedback.push("Include numbers");

    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score += 1;
    else feedback.push("Include special characters");

    // Common password check
    const commonPasswords = [
      "12345678", "password123", "qwertyuiop", "iloveyou", 
      "admin@123", "welcome1", "password", "123456789"
    ];
    
    if (commonPasswords.includes(password.toLowerCase())) {
      score = Math.min(score, 1);
      feedback.push("Avoid common passwords");
    }

    // Determine label
    let label: PasswordStrengthResponse['label'];
    if (score <= 1) label = "very weak";
    else if (score <= 2) label = "weak";
    else if (score <= 4) label = "medium";
    else if (score <= 5) label = "strong";
    else label = "very strong";

    return { score, label, feedback };
  }
);
