import crypto from "crypto";
import { env } from "../config/env";

const algorithm = "aes-256-cbc";
const key = crypto.createHash("sha256").update(env.encryptionKey).digest();
const ivLength = 16;

export const encryptText = (text: string): string => {
  const iv = crypto.randomBytes(ivLength);
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  const encrypted = Buffer.concat([cipher.update(text, "utf8"), cipher.final()]);
  return iv.toString("hex") + ":" + encrypted.toString("hex");
};

export const decryptText = (value: string): string => {
  const [ivHex, encryptedHex] = value.split(":");
  if (!ivHex || !encryptedHex) {
    throw new Error("Invalid encrypted payload");
  }
  const iv = Buffer.from(ivHex, "hex");
  const encrypted = Buffer.from(encryptedHex, "hex");
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  return Buffer.concat([decipher.update(encrypted), decipher.final()]).toString("utf8");
};
