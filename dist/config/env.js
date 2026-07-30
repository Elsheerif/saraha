"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.resolve(process.cwd(), ".env") });
const requireEnv = (key, fallback) => {
    const value = process.env[key] ?? fallback;
    if (!value) {
        throw new Error(`Environment variable ${key} is required`);
    }
    return value;
};
exports.env = {
    nodeEnv: process.env.NODE_ENV ?? "development",
    port: Number(process.env.PORT ?? 4000),
    mongoUri: requireEnv("MONGO_URI", "mongodb://127.0.0.1:27017/saraha"),
    jwtSecret: requireEnv("JWT_SECRET", "supersecret"),
    jwtAccessExpiry: process.env.JWT_ACCESS_EXPIRES ?? "15m",
    jwtRefreshExpiry: process.env.JWT_REFRESH_EXPIRES ?? "7d",
    passwordSaltRounds: Number(process.env.PASSWORD_SALT_ROUNDS ?? 10),
    emailFrom: process.env.EMAIL_FROM ?? "saraha@example.com",
    smtpHost: process.env.SMTP_HOST ?? "",
    smtpPort: Number(process.env.SMTP_PORT ?? 587),
    smtpUser: process.env.SMTP_USER ?? "",
    smtpPass: process.env.SMTP_PASS ?? "",
    googleClientId: process.env.GOOGLE_CLIENT_ID ?? "",
    encryptionKey: requireEnv("ENCRYPTION_KEY", "change-this-32-bytes-key-1234567"),
};
//# sourceMappingURL=env.js.map