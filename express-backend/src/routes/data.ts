import { Router } from 'express';
import { exportCSV, exportJSON } from '../controllers/dataController';

const router = Router();

// GET /data/csv
router.get('/csv', exportCSV);

// GET /data/json
router.get('/json', exportJSON);

export { router as dataRoutes };
