"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, _req, res, _next) => {
    console.error(err);
    const message = err instanceof Error ? err.message : "Unexpected server error";
    res.status(400).json({ message });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=error.middleware.js.map