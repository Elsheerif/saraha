"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const user_repository_1 = require("../repositories/user.repository");
const crypto_util_1 = require("../utils/crypto.util");
class UserService {
    constructor() {
        this.userRepository = new user_repository_1.UserRepository();
    }
    async getProfile(userId) {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new Error("User not found");
        }
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            verified: user.verified,
            profileImage: user.profileImage,
            coverImages: user.coverImages,
            galleryImages: user.galleryImages,
            visitCount: user.visitCount,
            privateNotes: user.privateNotes ? (0, crypto_util_1.decryptText)(user.privateNotes) : undefined,
        };
    }
    async incrementProfileVisits(userId) {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new Error("User not found");
        }
        user.visitCount += 1;
        await this.userRepository.save(user);
    }
    async updateProfileImage(userId, imagePath) {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new Error("User not found");
        }
        if (user.profileImage) {
            user.galleryImages.push(user.profileImage);
        }
        user.profileImage = imagePath;
        await this.userRepository.save(user);
    }
    async addCoverImages(userId, imagePaths) {
        const user = await this.userRepository.findById(userId);
        if (!user)
            throw new Error("User not found");
        user.coverImages = [...user.coverImages, ...imagePaths].slice(0, 2);
        await this.userRepository.save(user);
    }
    async setPrivateNotes(userId, notes) {
        const user = await this.userRepository.findById(userId);
        if (!user)
            throw new Error("User not found");
        user.privateNotes = (0, crypto_util_1.encryptText)(notes);
        await this.userRepository.save(user);
    }
}
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map