"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const validation_1 = require("../middleware/validation");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
exports.authRoutes = router;
router.post('/login', validation_1.validateLogin, validation_1.handleValidationErrors, authController_1.login);
router.post('/logout', auth_1.authenticateToken, authController_1.logout);
router.post('/register', validation_1.validateRegister, validation_1.handleValidationErrors, authController_1.register);
//# sourceMappingURL=auth.js.map