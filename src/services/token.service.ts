import jwt, { SignOptions } from "jsonwebtoken";
import { env } from "../config/env";

export interface JwtPayload {
  userId: string;
  role: string;
}

const signOptions = (expiresIn: string): SignOptions => ({
  expiresIn: expiresIn as SignOptions["expiresIn"],
});

export class TokenService {
  createAccessToken(payload: JwtPayload): string {
    return jwt.sign(payload, env.jwtSecret, signOptions(env.jwtAccessExpiry));
  }

  createRefreshToken(payload: JwtPayload): string {
    return jwt.sign(payload, env.jwtSecret, signOptions(env.jwtRefreshExpiry));
  }

  verifyToken<T>(token: string): T {
    return jwt.verify(token, env.jwtSecret) as T;
  }
}
