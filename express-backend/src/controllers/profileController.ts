import { Request, Response, NextFunction } from 'express';
import { UserProfile } from '../types';

export const getProfile = async (
  req: Request,
  res: Response<UserProfile>,
  next: NextFunction
): Promise<void> => {
  try {
    // Mock user profile - in real app, get from database using req.user.userId
    const profile: UserProfile = {
      id: req.user?.userId || "00000000-0000-0000-0000-000000000001",
      email: req.user?.email || "user@example.com",
      role: (req.user?.role as 'user' | 'admin') || "user",
      theme: "light", // This would come from user preferences in database
    };

    res.json(profile);
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (
  req: Request,
  res: Response<UserProfile>,
  next: NextFunction
): Promise<void> => {
  try {
    const { theme } = req.body;
    const userId = req.user?.userId;

    if (!userId) {
      const error = new Error('User not authenticated');
      (error as any).statusCode = 401;
      return next(error);
    }

    // In a real app, update the user's theme preference in the database
    // For now, just return the updated profile
    const profile: UserProfile = {
      id: userId,
      email: req.user?.email || "user@example.com",
      role: (req.user?.role as 'user' | 'admin') || "user",
      theme: theme || "light",
    };

    res.json(profile);
  } catch (error) {
    next(error);
  }
};
