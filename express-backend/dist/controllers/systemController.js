"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDeviceInfo = void 0;
const getDeviceInfo = async (req, res, next) => {
    try {
        const deviceInfo = {
            mac_address: "00:1B:44:11:3A:B7",
            ip_address: "192.168.1.100",
            gateway: "192.168.1.1",
        };
        res.json(deviceInfo);
    }
    catch (error) {
        next(error);
    }
};
exports.getDeviceInfo = getDeviceInfo;
//# sourceMappingURL=systemController.js.map