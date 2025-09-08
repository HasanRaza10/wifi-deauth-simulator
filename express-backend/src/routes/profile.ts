import { Router } from 'express';
import { getProfile, updateProfile } from '../controllers/profileController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// GET /me
router.get('/', authenticateToken, getProfile);

// PATCH /me
router.patch('/', authenticateToken, updateProfile);

export { router as profileRoutes };
