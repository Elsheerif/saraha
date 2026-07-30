import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import { createMessage, listMessages } from "../controllers/message.controller";

const router = Router();
router.post("/", authenticate, (req, res, next) => {
  const content = typeof req.body?.content === "string" ? req.body.content.trim() : "";
  if (!content || content.length > 1000) {
    return res.status(400).json({ message: "Validation failed", details: ["content must be a non-empty string up to 1000 characters"] });
  }
  req.body.content = content;
  return createMessage(req, res, next);
});
router.get("/", authenticate, listMessages);
export default router;
