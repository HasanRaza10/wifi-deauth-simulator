"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.simulationRoutes = void 0;
const express_1 = require("express");
const simulationController_1 = require("../controllers/simulationController");
const validation_1 = require("../middleware/validation");
const router = (0, express_1.Router)();
exports.simulationRoutes = router;
router.get('/wifi-list', simulationController_1.getWiFiList);
router.post('/deauth', validation_1.validateDeauth, validation_1.handleValidationErrors, simulationController_1.simulateDeauth);
router.get('/connected-devices', simulationController_1.getConnectedDevices);
router.get('/live-activity', simulationController_1.getLiveActivity);
//# sourceMappingURL=simulation.js.map