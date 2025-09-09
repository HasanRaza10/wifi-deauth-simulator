import { Request, Response, NextFunction } from 'express';
import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from '../types';
export declare const login: (req: Request<{}, LoginResponse, LoginRequest>, res: Response<LoginResponse>, next: NextFunction) => Promise<void>;
export declare const logout: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const register: (req: Request<{}, RegisterResponse, RegisterRequest>, res: Response<RegisterResponse>, next: NextFunction) => Promise<void>;
//# sourceMappingURL=authController.d.ts.map