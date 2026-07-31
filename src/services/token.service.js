"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../config/env");
const signOptions = (expiresIn) => ({ expiresIn: expiresIn });
class TokenService {
    createAccessToken(payload) {
        return jsonwebtoken_1.default.sign(payload, env_1.env.jwtSecret, signOptions(env_1.env.jwtAccessExpiry));
    }
    createRefreshToken(payload) {
        return jsonwebtoken_1.default.sign(payload, env_1.env.jwtSecret, signOptions(env_1.env.jwtRefreshExpiry));
    }
    verifyToken(token) {
        return jsonwebtoken_1.default.verify(token, env_1.env.jwtSecret);
    }
}
exports.TokenService = TokenService;
//# sourceMappingURL=token.service.js.map