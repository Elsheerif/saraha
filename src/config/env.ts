import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const requireEnv = (key: string, fallback?: string): string => {
  const value = process.env[key] ?? fallback;
  if (!value) {
    throw new Error(`Environment variable ${key} is required`);
  }
  return value;
};

export const env = {
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
