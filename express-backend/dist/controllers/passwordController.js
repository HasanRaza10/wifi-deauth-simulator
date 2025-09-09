"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listPasswords = exports.savePassword = exports.checkStrength = void 0;
const checkStrength = async (req, res, next) => {
    try {
        const { password } = req.body;
        let score = 0;
        const feedback = [];
        if (password.length >= 12) {
            score += 2;
        }
        else if (password.length >= 8) {
            score += 1;
        }
        else {
            feedback.push("Use at least 12 characters");
        }
        if (/[a-z]/.test(password))
            score += 1;
        else
            feedback.push("Include lowercase letters");
        if (/[A-Z]/.test(password))
            score += 1;
        else
            feedback.push("Include uppercase letters");
        if (/\d/.test(password))
            score += 1;
        else
            feedback.push("Include numbers");
        if (/[!@#$%^&*(),.?":{}|<>]/.test(password))
            score += 1;
        else
            feedback.push("Include special characters");
        const commonPasswords = [
            "12345678", "password123", "qwertyuiop", "iloveyou",
            "admin@123", "welcome1", "password", "123456789"
        ];
        if (commonPasswords.includes(password.toLowerCase())) {
            score = Math.min(score, 1);
            feedback.push("Avoid common passwords");
        }
        let label;
        if (score <= 1)
            label = "very weak";
        else if (score <= 2)
            label = "weak";
        else if (score <= 4)
            label = "medium";
        else if (score <= 5)
            label = "strong";
        else
            label = "very strong";
        res.json({ score, label, feedback });
    }
    catch (error) {
        next(error);
    }
};
exports.checkStrength = checkStrength;
const savePassword = async (req, res, next) => {
    try {
        const { domain, password } = req.body;
        res.status(201).json({
            id: Math.floor(Math.random() * 1000).toString(),
            domain: domain,
            created_at: new Date().toISOString(),
        });
    }
    catch (error) {
        next(error);
    }
};
exports.savePassword = savePassword;
const listPasswords = async (req, res, next) => {
    try {
        const passwords = [
            { id: "1", domain: "example.com", created_at: "2024-01-15T10:30:00Z" },
            { id: "2", domain: "github.com", created_at: "2024-01-14T15:45:00Z" },
            { id: "3", domain: "google.com", created_at: "2024-01-13T09:20:00Z" },
        ];
        res.json({ passwords });
    }
    catch (error) {
        next(error);
    }
};
exports.listPasswords = listPasswords;
//# sourceMappingURL=passwordController.js.map