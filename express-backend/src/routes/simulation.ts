import { Router } from 'express';
import { 
  getWiFiList, 
  simulateDeauth, 
  getConnectedDevices,
  getLiveActivity
} from '../controllers/simulationController';
import { validateDeauth, handleValidationErrors } from '../middleware/validation';

const router = Router();

// GET /simulation/wifi-list
router.get('/wifi-list', getWiFiList);

// POST /simulation/deauth
router.post('/deauth', validateDeauth, handleValidationErrors, simulateDeauth);

// GET /simulation/connected-devices
router.get('/connected-devices', getConnectedDevices);

// GET /simulation/live-activity
router.get('/live-activity', getLiveActivity);

export { router as simulationRoutes };
