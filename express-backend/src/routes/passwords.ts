import { Router } from 'express';
import { 
  checkStrength, 
  savePassword, 
  listPasswords 
} from '../controllers/passwordController';
import { 
  validatePasswordStrength, 
  validateSavePassword, 
  handleValidationErrors 
} from '../middleware/validation';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// POST /passwords/strength
router.post('/strength', validatePasswordStrength, handleValidationErrors, checkStrength);

// POST /passwords/save
router.post('/save', authenticateToken, validateSavePassword, handleValidationErrors, savePassword);

// POST /passwords/list
router.post('/list', authenticateToken, listPasswords);

export { router as passwordRoutes };
