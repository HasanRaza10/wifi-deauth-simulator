import { Router } from 'express';
import { getDeviceInfo } from '../controllers/systemController';

const router = Router();

// GET /system/device-info
router.get('/device-info', getDeviceInfo);

export { router as systemRoutes };
