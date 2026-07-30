import { Router } from "express";
import { shareProfile, uploadProfileImage, uploadCoverImages, updatePrivateNotes } from "../controllers/user.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { uploadProfileImage as profileUpload, uploadCoverImages as coverUpload } from "../middlewares/upload.middleware";
import { validate } from "../middlewares/validation.middleware";
import { privateNotesSchema } from "../validations/user.validation";

const router = Router();
router.get("/:id/share", shareProfile);
router.post("/profile-image", authenticate, profileUpload, uploadProfileImage);
router.post("/cover-images", authenticate, coverUpload, uploadCoverImages);
router.post("/private-notes", authenticate, validate(privateNotesSchema), updatePrivateNotes);
export default router;
