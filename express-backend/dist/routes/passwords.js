"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.passwordRoutes = void 0;
const express_1 = require("express");
const passwordController_1 = require("../controllers/passwordController");
const validation_1 = require("../middleware/validation");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
exports.passwordRoutes = router;
router.post('/strength', validation_1.validatePasswordStrength, validation_1.handleValidationErrors, passwordController_1.checkStrength);
router.post('/save', auth_1.authenticateToken, validation_1.validateSavePassword, validation_1.handleValidationErrors, passwordController_1.savePassword);
router.post('/list', auth_1.authenticateToken, passwordController_1.listPasswords);
//# sourceMappingURL=passwords.js.map