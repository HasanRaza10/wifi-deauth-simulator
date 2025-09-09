"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataRoutes = void 0;
const express_1 = require("express");
const dataController_1 = require("../controllers/dataController");
const router = (0, express_1.Router)();
exports.dataRoutes = router;
router.get('/csv', dataController_1.exportCSV);
router.get('/json', dataController_1.exportJSON);
//# sourceMappingURL=data.js.map