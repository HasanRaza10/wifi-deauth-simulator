"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireRole = exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const errorHandler_1 = require("./errorHandler");
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        const error = (0, errorHandler_1.createError)('Access token required', 401, 'UNAUTHENTICATED');
        return next(error);
    }
    try {
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error('JWT_SECRET not configured');
        }
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        req.user = decoded;
        next();
    }
    catch (error) {
        const authError = (0, errorHandler_1.createError)('Invalid or expired token', 401, 'UNAUTHENTICATED');
        return next(authError);
    }
};
exports.authenticateToken = authenticateToken;
const requireRole = (allowedRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            const error = (0, errorHandler_1.createError)('Authentication required', 401, 'UNAUTHENTICATED');
            return next(error);
        }
        if (!allowedRoles.includes(req.user.role)) {
            const error = (0, errorHandler_1.createError)('Insufficient permissions', 403, 'PERMISSION_DENIED');
            return next(error);
        }
        next();
    };
};
exports.requireRole = requireRole;
//# sourceMappingURL=auth.js.map