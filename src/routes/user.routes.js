"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const upload_middleware_1 = require("../middlewares/upload.middleware");
const validation_middleware_1 = require("../middlewares/validation.middleware");
const user_validation_1 = require("../validations/user.validation");
const router = (0, express_1.Router)();
router.get("/:id/share", user_controller_1.shareProfile);
router.post("/profile-image", auth_middleware_1.authenticate, upload_middleware_1.uploadProfileImage, user_controller_1.uploadProfileImage);
router.post("/cover-images", auth_middleware_1.authenticate, upload_middleware_1.uploadCoverImages, user_controller_1.uploadCoverImages);
router.post("/private-notes", auth_middleware_1.authenticate, (0, validation_middleware_1.validate)(user_validation_1.privateNotesSchema), user_controller_1.updatePrivateNotes);
exports.default = router;
//# sourceMappingURL=user.routes.js.map