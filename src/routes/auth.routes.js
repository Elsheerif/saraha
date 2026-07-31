"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const validation_middleware_1 = require("../middlewares/validation.middleware");
const auth_validation_1 = require("../validations/auth.validation");
const router = (0, express_1.Router)();
router.post("/signup", (0, validation_middleware_1.validate)(auth_validation_1.signupSchema), auth_controller_1.signup);
router.post("/verify-email", (0, validation_middleware_1.validate)(auth_validation_1.verifyEmailSchema), auth_controller_1.verifyEmail);
router.post("/login", (0, validation_middleware_1.validate)(auth_validation_1.loginSchema), auth_controller_1.login);
router.post("/refresh", (0, validation_middleware_1.validate)(auth_validation_1.refreshSchema), auth_controller_1.refresh);
router.post("/logout", auth_middleware_1.authenticate, (0, validation_middleware_1.validate)(auth_validation_1.logoutSchema), auth_controller_1.logout);
router.post("/logout-all", auth_middleware_1.authenticate, auth_controller_1.logoutAll);
router.post("/google", (0, validation_middleware_1.validate)(auth_validation_1.googleLoginSchema), auth_controller_1.googleLogin);
router.get("/profile", auth_middleware_1.authenticate, auth_controller_1.profile);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map