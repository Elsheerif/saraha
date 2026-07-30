"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const message_controller_1 = require("../controllers/message.controller");
const router = (0, express_1.Router)();
router.post("/", auth_middleware_1.authenticate, (req, res, next) => {
    const content = typeof req.body?.content === "string" ? req.body.content.trim() : "";
    if (!content || content.length > 1000) {
        return res.status(400).json({ message: "Validation failed", details: ["content must be a non-empty string up to 1000 characters"] });
    }
    req.body.content = content;
    return (0, message_controller_1.createMessage)(req, res, next);
});
router.get("/", auth_middleware_1.authenticate, message_controller_1.listMessages);
exports.default = router;
//# sourceMappingURL=message.routes.js.map