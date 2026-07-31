"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutSchema = exports.googleLoginSchema = exports.refreshSchema = exports.verifyEmailSchema = exports.loginSchema = exports.signupSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.signupSchema = joi_1.default.object({
    name: joi_1.default.string().trim().min(1).max(100).required(),
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().min(8).max(128).pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[a-z]).*$/).required(),
});
exports.loginSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().required(),
});
exports.verifyEmailSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    otpCode: joi_1.default.string().length(6).required(),
});
exports.refreshSchema = joi_1.default.object({
    refreshToken: joi_1.default.string().required(),
});
exports.logoutSchema = joi_1.default.object({
    refreshToken: joi_1.default.string().required(),
});
exports.googleLoginSchema = joi_1.default.object({
    idToken: joi_1.default.string().required(),
});
//# sourceMappingURL=auth.validation.js.map