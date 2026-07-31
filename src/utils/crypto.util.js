"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decryptText = exports.encryptText = void 0;
const crypto_1 = __importDefault(require("crypto"));
const env_1 = require("../config/env");
const algorithm = "aes-256-cbc";
const key = crypto_1.default.createHash("sha256").update(env_1.env.encryptionKey).digest();
const ivLength = 16;
const encryptText = (text) => {
    const iv = crypto_1.default.randomBytes(ivLength);
    const cipher = crypto_1.default.createCipheriv(algorithm, key, iv);
    const encrypted = Buffer.concat([cipher.update(text, "utf8"), cipher.final()]);
    return iv.toString("hex") + ":" + encrypted.toString("hex");
};
exports.encryptText = encryptText;
const decryptText = (value) => {
    const [ivHex, encryptedHex] = value.split(":");
    if (!ivHex || !encryptedHex) {
        throw new Error("Invalid encrypted payload");
    }
    const iv = Buffer.from(ivHex, "hex");
    const encrypted = Buffer.from(encryptedHex, "hex");
    const decipher = crypto_1.default.createDecipheriv(algorithm, key, iv);
    return Buffer.concat([decipher.update(encrypted), decipher.final()]).toString("utf8");
};
exports.decryptText = decryptText;
//# sourceMappingURL=crypto.util.js.map