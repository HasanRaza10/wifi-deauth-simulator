import { Router } from 'express';
import { 
  getWiFiList, 
  simulateDeauth, 
  getConnectedDevices 
} from '../controllers/simulationController';
import { validateDeauth, handleValidationErrors } from '../middleware/validation';

const router = Router();

// GET /simulation/wifi-list
router.get('/wifi-list', getWiFiList);

// POST /simulation/deauth
router.post('/deauth', validateDeauth, handleValidationErrors, simulateDeauth);

// GET /simulation/connected-devices
router.get('/connected-devices', getConnectedDevices);

export { router as simulationRoutes };
