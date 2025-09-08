import { Router } from 'express';
import { getNewsFeed } from '../controllers/newsController';

const router = Router();

// GET /news/feed
router.get('/feed', getNewsFeed);

export { router as newsRoutes };
