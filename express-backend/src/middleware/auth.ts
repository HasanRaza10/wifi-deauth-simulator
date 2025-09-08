import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWTPayload } from '../types';
import { createError } from './errorHandler';

// Extend Request interface to include user
declare global {
  namespace Express {
    interface Request {
      user?: JWTPayload;
    }
  }
}

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    const error = createError('Access token required', 401, 'UNAUTHENTICATED');
    return next(error);
  }

  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error('JWT_SECRET not configured');
    }

    const decoded = jwt.verify(token, secret) as JWTPayload;
    req.user = decoded;
    next();
  } catch (error) {
    const authError = createError('Invalid or expired token', 401, 'UNAUTHENTICATED');
    return next(authError);
  }
};

export const requireRole = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      const error = createError('Authentication required', 401, 'UNAUTHENTICATED');
      return next(error);
    }

    if (!allowedRoles.includes(req.user.role)) {
      const error = createError('Insufficient permissions', 403, 'PERMISSION_DENIED');
      return next(error);
    }

    next();
  };
};
