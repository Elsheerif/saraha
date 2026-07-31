"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.profile = exports.googleLogin = exports.logoutAll = exports.logout = exports.refresh = exports.login = exports.verifyEmail = exports.signup = void 0;
const auth_service_1 = require("../services/auth.service");
const token_service_1 = require("../services/token.service");
const user_repository_1 = require("../repositories/user.repository");
const google_auth_library_1 = require("google-auth-library");
const env_1 = require("../config/env");
const authService = new auth_service_1.AuthService();
const tokenService = new token_service_1.TokenService();
const userRepository = new user_repository_1.UserRepository();
const googleClient = new google_auth_library_1.OAuth2Client(env_1.env.googleClientId);
const signup = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const result = await authService.signup({ name, email, password });
        res.status(201).json({ message: "Signup successful", userId: result.user.id, otpCode: result.otpCode });
    }
    catch (error) {
        next(error);
    }
};
exports.signup = signup;
const verifyEmail = async (req, res, next) => {
    try {
        const { email, otpCode } = req.body;
        const user = await authService.verifyEmail(email, otpCode);
        res.json({ message: "Email verified", userId: user.id });
    }
    catch (error) {
        next(error);
    }
};
exports.verifyEmail = verifyEmail;
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const { accessToken, refreshToken, user } = await authService.login(email, password);
        res.json({ accessToken, refreshToken, user: { id: user.id, email: user.email, name: user.name, role: user.role } });
    }
    catch (error) {
        next(error);
    }
};
exports.login = login;
const refresh = async (req, res, next) => {
    try {
        const { refreshToken } = req.body;
        const tokens = await authService.refresh(refreshToken);
        res.json(tokens);
    }
    catch (error) {
        next(error);
    }
};
exports.refresh = refresh;
const logout = async (req, res, next) => {
    try {
        const userId = req.user?.userId;
        const { refreshToken } = req.body;
        await authService.logout(userId, refreshToken);
        res.json({ message: "Logged out from current device" });
    }
    catch (error) {
        next(error);
    }
};
exports.logout = logout;
const logoutAll = async (req, res, next) => {
    try {
        const userId = req.user?.userId;
        await authService.logoutAll(userId);
        res.json({ message: "Logged out from all devices" });
    }
    catch (error) {
        next(error);
    }
};
exports.logoutAll = logoutAll;
const googleLogin = async (req, res, next) => {
    try {
        const { idToken } = req.body;
        if (!idToken) {
            throw new Error("Google ID token is required");
        }
        const ticket = await googleClient.verifyIdToken({ idToken, audience: env_1.env.googleClientId });
        const payload = ticket.getPayload();
        if (!payload?.email || !payload.name) {
            throw new Error("Unable to verify Google account");
        }
        let user = await userRepository.findByEmail(payload.email);
        if (!user) {
            const password = Math.random().toString(36).slice(-12);
            const result = await authService.signup({ name: payload.name, email: payload.email, password });
            user = result.user;
            user.verified = true;
            await userRepository.save(user);
        }
        const payloadToken = { userId: user.id, role: user.role };
        const accessToken = tokenService.createAccessToken(payloadToken);
        const refreshToken = tokenService.createRefreshToken(payloadToken);
        await userRepository.addRefreshToken(user.id, refreshToken);
        res.json({ accessToken, refreshToken, user: { id: user.id, email: user.email, name: user.name } });
    }
    catch (error) {
        next(error);
    }
};
exports.googleLogin = googleLogin;
const profile = async (req, res, next) => {
    try {
        const userId = req.user?.userId;
        if (!userId) {
            throw new Error("Unauthorized");
        }
        const result = await userRepository.findById(userId);
        if (!result) {
            throw new Error("User not found");
        }
        res.json({ id: result.id, name: result.name, email: result.email, role: result.role, verified: result.verified, profileImage: result.profileImage, coverImages: result.coverImages, galleryImages: result.galleryImages });
    }
    catch (error) {
        next(error);
    }
};
exports.profile = profile;
//# sourceMappingURL=auth.controller.js.map