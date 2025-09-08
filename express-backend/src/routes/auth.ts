import { Router } from 'express';
import { login, logout, register } from '../controllers/authController';
import { validateLogin, validateRegister, handleValidationErrors } from '../middleware/validation';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// POST /auth/login
router.post('/login', validateLogin, handleValidationErrors, login);

// POST /auth/logout
router.post('/logout', authenticateToken, logout);

// POST /auth/register
router.post('/register', validateRegister, handleValidationErrors, register);

export { router as authRoutes };
