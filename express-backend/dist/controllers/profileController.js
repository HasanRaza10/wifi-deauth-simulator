"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfile = exports.getProfile = void 0;
const getProfile = async (req, res, next) => {
    try {
        const profile = {
            id: req.user?.userId || "00000000-0000-0000-0000-000000000001",
            email: req.user?.email || "user@example.com",
            role: req.user?.role || "user",
            theme: "light",
        };
        res.json(profile);
    }
    catch (error) {
        next(error);
    }
};
exports.getProfile = getProfile;
const updateProfile = async (req, res, next) => {
    try {
        const { theme } = req.body;
        const userId = req.user?.userId;
        if (!userId) {
            const error = new Error('User not authenticated');
            error.statusCode = 401;
            return next(error);
        }
        const profile = {
            id: userId,
            email: req.user?.email || "user@example.com",
            role: req.user?.role || "user",
            theme: theme || "light",
        };
        res.json(profile);
    }
    catch (error) {
        next(error);
    }
};
exports.updateProfile = updateProfile;
//# sourceMappingURL=profileController.js.map