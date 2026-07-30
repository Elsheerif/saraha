import nodemailer from "nodemailer";
import { env } from "../config/env";

const transport = nodemailer.createTransport({
  host: env.smtpHost || "smtp.gmail.com",
  port: env.smtpPort,
  secure: env.smtpPort === 465,
  auth: env.smtpUser && env.smtpPass ? { user: env.smtpUser, pass: env.smtpPass } : undefined,
});

export const sendEmail = async (to: string, subject: string, text: string): Promise<void> => {
  if (!env.smtpUser || !env.smtpPass) {
    console.warn("SMTP not configured. Skipping email send for", to);
    console.info("Email text:", text);
    return;
  }

  await transport.sendMail({
    from: env.emailFrom,
    to,
    subject,
    text,
  });
};
