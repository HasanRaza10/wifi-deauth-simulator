import { Request, Response, NextFunction } from 'express';
import { ExportCSVResponse, ExportJSONResponse } from '../types';
export declare const exportCSV: (req: Request, res: Response<ExportCSVResponse>, next: NextFunction) => Promise<void>;
export declare const exportJSON: (req: Request, res: Response<ExportJSONResponse>, next: NextFunction) => Promise<void>;
//# sourceMappingURL=dataController.d.ts.map