"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.profileRoutes = void 0;
const express_1 = require("express");
const profileController_1 = require("../controllers/profileController");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
exports.profileRoutes = router;
router.get('/', auth_1.authenticateToken, profileController_1.getProfile);
router.patch('/', auth_1.authenticateToken, profileController_1.updateProfile);
//# sourceMappingURL=profile.js.map