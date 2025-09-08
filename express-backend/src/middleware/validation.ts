import { Request, Response, NextFunction } from 'express';
import { body, validationResult, ValidationChain } from 'express-validator';
import { createError } from './errorHandler';

export const handleValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = createError(
      'Validation failed',
      400,
      'INVALID_ARGUMENT',
      errors.array()
    );
    return next(error);
  }
  next();
};

// Auth validation rules
export const validateLogin: ValidationChain[] = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Valid email is required'),
  body('password')
    .isLength({ min: 1 })
    .withMessage('Password is required'),
];

export const validateRegister: ValidationChain[] = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Valid email is required'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
];

// Password validation rules
export const validatePasswordStrength: ValidationChain[] = [
  body('password')
    .isLength({ min: 1 })
    .withMessage('Password is required'),
];

export const validateSavePassword: ValidationChain[] = [
  body('domain')
    .isLength({ min: 1 })
    .withMessage('Domain is required'),
  body('password')
    .isLength({ min: 1 })
    .withMessage('Password is required'),
];

// Deauth validation rules
export const validateDeauth: ValidationChain[] = [
  body('target_bssid')
    .isLength({ min: 1 })
    .withMessage('Target BSSID is required')
    .matches(/^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/)
    .withMessage('Invalid BSSID format'),
];

// News validation rules (for query parameters, not body)
export const validateNewsQuery: ValidationChain[] = [
  // Note: These would be used with query() instead of body() for GET requests
  // For now, we'll handle validation in the controller
];
