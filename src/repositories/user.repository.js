"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const user_model_1 = require("../models/user.model");
class UserRepository {
    async create(user) {
        return user_model_1.UserModel.create(user);
    }
    async findByEmail(email) {
        return user_model_1.UserModel.findOne({ email }).exec();
    }
    async findById(id) {
        return user_model_1.UserModel.findById(id).exec();
    }
    async findByOtp(email, otpCode) {
        return user_model_1.UserModel.findOne({ email, otpCode }).exec();
    }
    async save(user) {
        return user.save();
    }
    async addRefreshToken(userId, token) {
        await user_model_1.UserModel.findByIdAndUpdate(userId, { $addToSet: { refreshTokens: token } }).exec();
    }
    async removeRefreshToken(userId, token) {
        await user_model_1.UserModel.findByIdAndUpdate(userId, { $pull: { refreshTokens: token } }).exec();
    }
    async clearRefreshTokens(userId) {
        await user_model_1.UserModel.findByIdAndUpdate(userId, { refreshTokens: [] }).exec();
    }
}
exports.UserRepository = UserRepository;
//# sourceMappingURL=user.repository.js.map