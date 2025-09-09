"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateNewsQuery = exports.validateDeauth = exports.validateSavePassword = exports.validatePasswordStrength = exports.validateRegister = exports.validateLogin = exports.handleValidationErrors = void 0;
const express_validator_1 = require("express-validator");
const errorHandler_1 = require("./errorHandler");
const handleValidationErrors = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        const error = (0, errorHandler_1.createError)('Validation failed', 400, 'INVALID_ARGUMENT', errors.array());
        return next(error);
    }
    next();
};
exports.handleValidationErrors = handleValidationErrors;
exports.validateLogin = [
    (0, express_validator_1.body)('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Valid email is required'),
    (0, express_validator_1.body)('password')
        .isLength({ min: 1 })
        .withMessage('Password is required'),
];
exports.validateRegister = [
    (0, express_validator_1.body)('name')
        .isLength({ min: 1 })
        .withMessage('Name is required'),
    (0, express_validator_1.body)('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Valid email is required'),
    (0, express_validator_1.body)('password')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
        .withMessage('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
];
exports.validatePasswordStrength = [
    (0, express_validator_1.body)('password')
        .isLength({ min: 1 })
        .withMessage('Password is required'),
];
exports.validateSavePassword = [
    (0, express_validator_1.body)('domain')
        .isLength({ min: 1 })
        .withMessage('Domain is required'),
    (0, express_validator_1.body)('password')
        .isLength({ min: 1 })
        .withMessage('Password is required'),
];
exports.validateDeauth = [
    (0, express_validator_1.body)('target_bssid')
        .isLength({ min: 1 })
        .withMessage('Target BSSID is required')
        .matches(/^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/)
        .withMessage('Invalid BSSID format'),
];
exports.validateNewsQuery = [];
//# sourceMappingURL=validation.js.map