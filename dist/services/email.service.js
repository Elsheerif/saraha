"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const env_1 = require("../config/env");
const transport = nodemailer_1.default.createTransport({
    host: env_1.env.smtpHost || "smtp.gmail.com",
    port: env_1.env.smtpPort,
    secure: env_1.env.smtpPort === 465,
    auth: env_1.env.smtpUser && env_1.env.smtpPass ? { user: env_1.env.smtpUser, pass: env_1.env.smtpPass } : undefined,
});
const sendEmail = async (to, subject, text) => {
    if (!env_1.env.smtpUser || !env_1.env.smtpPass) {
        console.warn("SMTP not configured. Skipping email send for", to);
        console.info("Email text:", text);
        return;
    }
    await transport.sendMail({
        from: env_1.env.emailFrom,
        to,
        subject,
        text,
    });
};
exports.sendEmail = sendEmail;
//# sourceMappingURL=email.service.js.map