import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { pool } from '../config/database';
import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse, User } from '../types';
import { createError } from '../middleware/errorHandler';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h';

export const login = async (
  req: Request<{}, LoginResponse, LoginRequest>,
  res: Response<LoginResponse>,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Demo login - no database required
    if (email === 'user@example.com' && password === 'DevOnlyPassword!234') {
      // Create JWT token
      const token = jwt.sign(
        {
          userId: "1",
          email: email,
          role: 'user',
        },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
      );

      // Set cookie
      res.cookie('auth_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
      });

      res.json({
        user: {
          id: "1",
          email: email,
          role: 'user',
        },
      });
      return;
    }

    // Invalid credentials
    const error = createError('Invalid credentials', 401, 'UNAUTHENTICATED');
    return next(error);
  } catch (error) {
    next(error);
  }
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Clear cookie
    res.clearCookie('auth_token');
    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    next(error);
  }
};

export const register = async (
  req: Request<{}, RegisterResponse, RegisterRequest>,
  res: Response<RegisterResponse>,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await pool.query(
      'SELECT id FROM users WHERE email = $1',
      [email]
    );

    if (existingUser.rows.length > 0) {
      const error = createError('User already exists', 409, 'ALREADY_EXISTS');
      return next(error);
    }

    // Hash password
    const saltRounds = 12;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Create user
    const userResult = await pool.query<User>(
      'INSERT INTO users (email, password_hash, role) VALUES ($1, $2, $3) RETURNING id, email, role',
      [email, passwordHash, 'user']
    );

    const user = userResult.rows[0];

    // Log audit
    await pool.query(
      'INSERT INTO audit_logs (user_id, action, meta) VALUES ($1, $2, $3)',
      [user.id, 'register', JSON.stringify({ email: user.email })]
    );

    res.status(201).json({
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};
