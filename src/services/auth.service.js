"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_repository_1 = require("../repositories/user.repository");
const token_service_1 = require("./token.service");
const otp_util_1 = require("../utils/otp.util");
const email_service_1 = require("./email.service");
const env_1 = require("../config/env");
class AuthService {
    constructor() {
        this.userRepository = new user_repository_1.UserRepository();
        this.tokenService = new token_service_1.TokenService();
    }
    async signup(data) {
        const existing = await this.userRepository.findByEmail(data.email);
        if (existing) {
            throw new Error("Email is already registered");
        }
        const password = await bcryptjs_1.default.hash(data.password, env_1.env.passwordSaltRounds);
        const otpCode = (0, otp_util_1.createOtp)(6);
        const otpExpires = new Date(Date.now() + 1000 * 60 * 5);
        const user = await this.userRepository.create({
            name: data.name,
            email: data.email,
            password,
            otpCode,
            otpExpires,
            verified: false,
            refreshTokens: [],
        });
        await (0, email_service_1.sendEmail)(data.email, "Welcome to Saraha - Confirm your email", `Dear ${data.name},\n\nYour verification code is ${otpCode}. It expires in 5 minutes.\n\nThank you.`);
        return { user, otpCode };
    }
    async verifyEmail(email, otpCode) {
        const user = await this.userRepository.findByOtp(email, otpCode);
        if (!user) {
            throw new Error("Invalid verification code");
        }
        if (!user.otpExpires || user.otpExpires < new Date()) {
            throw new Error("OTP has expired");
        }
        user.verified = true;
        user.otpCode = undefined;
        user.otpExpires = undefined;
        return this.userRepository.save(user);
    }
    async login(email, password) {
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new Error("Invalid credentials");
        }
        if (user.lockedUntil && user.lockedUntil > new Date()) {
            throw new Error("Account is temporarily locked due to failed login attempts");
        }
        const passwordMatches = await bcryptjs_1.default.compare(password, user.password);
        if (!passwordMatches) {
            user.loginAttempts += 1;
            if (user.loginAttempts >= 5) {
                user.lockedUntil = new Date(Date.now() + 5 * 60 * 1000);
            }
            await this.userRepository.save(user);
            throw new Error("Invalid credentials");
        }
        if (!user.verified) {
            throw new Error("Email verification is required before logging in");
        }
        user.loginAttempts = 0;
        user.lockedUntil = undefined;
        await this.userRepository.save(user);
        const payload = { userId: user.id, role: user.role };
        const accessToken = this.tokenService.createAccessToken(payload);
        const refreshToken = this.tokenService.createRefreshToken(payload);
        await this.userRepository.addRefreshToken(user.id, refreshToken);
        return { accessToken, refreshToken, user };
    }
    async refresh(refreshToken) {
        const decoded = this.tokenService.verifyToken(refreshToken);
        const user = await this.userRepository.findById(decoded.userId);
        if (!user) {
            throw new Error("Refresh token is invalid");
        }
        if (!user.refreshTokens.includes(refreshToken)) {
            throw new Error("Refresh token is revoked");
        }
        const payload = { userId: user.id, role: user.role };
        const accessToken = this.tokenService.createAccessToken(payload);
        const newRefreshToken = this.tokenService.createRefreshToken(payload);
        await this.userRepository.removeRefreshToken(user.id, refreshToken);
        await this.userRepository.addRefreshToken(user.id, newRefreshToken);
        return { accessToken, refreshToken: newRefreshToken };
    }
    async logout(userId, refreshToken) {
        await this.userRepository.removeRefreshToken(userId, refreshToken);
    }
    async logoutAll(userId) {
        await this.userRepository.clearRefreshTokens(userId);
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map