"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePrivateNotes = exports.uploadCoverImages = exports.uploadProfileImage = exports.shareProfile = void 0;
const user_service_1 = require("../services/user.service");
const userService = new user_service_1.UserService();
const shareProfile = async (req, res, next) => {
    try {
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
        await userService.incrementProfileVisits(id);
        const profile = await userService.getProfile(id);
        res.json({ profile, shared: true });
    }
    catch (error) {
        next(error);
    }
};
exports.shareProfile = shareProfile;
const uploadProfileImage = async (req, res, next) => {
    try {
        const userId = req.user?.userId;
        if (!req.file) {
            throw new Error("Profile image file is required");
        }
        const location = `/uploads/${req.file.filename}`;
        await userService.updateProfileImage(userId, location);
        res.json({ message: "Profile image updated", location });
    }
    catch (error) {
        next(error);
    }
};
exports.uploadProfileImage = uploadProfileImage;
const uploadCoverImages = async (req, res, next) => {
    try {
        const userId = req.user?.userId;
        if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
            throw new Error("At least one cover image is required");
        }
        const locations = req.files.map((file) => `/uploads/${file.filename}`);
        await userService.addCoverImages(userId, locations);
        res.json({ message: "Cover images uploaded", locations });
    }
    catch (error) {
        next(error);
    }
};
exports.uploadCoverImages = uploadCoverImages;
const updatePrivateNotes = async (req, res, next) => {
    try {
        const userId = req.user?.userId;
        const { notes } = req.body;
        await userService.setPrivateNotes(userId, notes);
        res.json({ message: "Private notes stored securely" });
    }
    catch (error) {
        next(error);
    }
};
exports.updatePrivateNotes = updatePrivateNotes;
//# sourceMappingURL=user.controller.js.map