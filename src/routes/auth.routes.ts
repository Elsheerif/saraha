import { Router } from "express";
import { signup, verifyEmail, login, refresh, logout, logoutAll, googleLogin, profile } from "../controllers/auth.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validation.middleware";
import { signupSchema, loginSchema, verifyEmailSchema, refreshSchema, googleLoginSchema } from "../validations/auth.validation";

const router = Router();
router.post("/signup", validate(signupSchema), signup);
router.post("/verify-email", validate(verifyEmailSchema), verifyEmail);
router.post("/login", validate(loginSchema), login);
router.post("/refresh", validate(refreshSchema), refresh);
router.post("/logout", authenticate, logout);
router.post("/logout-all", authenticate, logoutAll);
router.post("/google", validate(googleLoginSchema), googleLogin);
router.get("/profile", authenticate, profile);
export default router;
