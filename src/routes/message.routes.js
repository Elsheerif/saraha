"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const message_controller_1 = require("../controllers/message.controller");
const validation_middleware_1 = require("../middlewares/validation.middleware");
const message_validation_1 = require("../validations/message.validation");
const router = (0, express_1.Router)();
router.post("/", auth_middleware_1.authenticate, (0, validation_middleware_1.validate)(message_validation_1.createMessageSchema), message_controller_1.createMessage);
router.get("/", auth_middleware_1.authenticate, message_controller_1.listMessages);
exports.default = router;
//# sourceMappingURL=message.routes.js.map