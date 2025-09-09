import { Request, Response, NextFunction } from 'express';
import { ValidationChain } from 'express-validator';
export declare const handleValidationErrors: (req: Request, res: Response, next: NextFunction) => void;
export declare const validateLogin: ValidationChain[];
export declare const validateRegister: ValidationChain[];
export declare const validatePasswordStrength: ValidationChain[];
export declare const validateSavePassword: ValidationChain[];
export declare const validateDeauth: ValidationChain[];
export declare const validateNewsQuery: ValidationChain[];
//# sourceMappingURL=validation.d.ts.map