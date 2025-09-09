import { Request, Response, NextFunction } from 'express';
import { NewsFeedRequest, NewsFeedResponse } from '../types';
export declare const getNewsFeed: (req: Request<{}, NewsFeedResponse, {}, NewsFeedRequest>, res: Response<NewsFeedResponse>, next: NextFunction) => Promise<void>;
//# sourceMappingURL=newsController.d.ts.map