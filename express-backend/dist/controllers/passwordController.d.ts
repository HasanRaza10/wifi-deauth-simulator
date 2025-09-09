import { Request, Response, NextFunction } from 'express';
import { PasswordStrengthRequest, PasswordStrengthResponse, SavePasswordRequest, SavePasswordResponse, ListPasswordsResponse } from '../types';
export declare const checkStrength: (req: Request<{}, PasswordStrengthResponse, PasswordStrengthRequest>, res: Response<PasswordStrengthResponse>, next: NextFunction) => Promise<void>;
export declare const savePassword: (req: Request<{}, SavePasswordResponse, SavePasswordRequest>, res: Response<SavePasswordResponse>, next: NextFunction) => Promise<void>;
export declare const listPasswords: (req: Request, res: Response<ListPasswordsResponse>, next: NextFunction) => Promise<void>;
//# sourceMappingURL=passwordController.d.ts.map