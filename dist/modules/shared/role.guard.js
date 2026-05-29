"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleGuard = roleGuard;
/**
 * ROLE BASED ACCESS CONTROL
 */
function roleGuard(...allowedRoles) {
    return (req, res, next) => {
        const user = req.user;
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized',
            });
        }
        if (!allowedRoles.includes(user.role)) {
            return res.status(403).json({
                success: false,
                message: 'Forbidden: insufficient permissions',
            });
        }
        next();
    };
}
