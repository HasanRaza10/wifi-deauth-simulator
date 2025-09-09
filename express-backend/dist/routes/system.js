"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.systemRoutes = void 0;
const express_1 = require("express");
const systemController_1 = require("../controllers/systemController");
const router = (0, express_1.Router)();
exports.systemRoutes = router;
router.get('/device-info', systemController_1.getDeviceInfo);
//# sourceMappingURL=system.js.map