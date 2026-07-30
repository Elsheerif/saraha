import { Request, Response, NextFunction } from "express";
import { TokenService, JwtPayload } from "../services/token.service";

const tokenService = new TokenService();

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authorization header missing" });
  }

  const token = authHeader.replace("Bearer ", "").trim();
  try {
    const decoded = tokenService.verifyToken<JwtPayload>(token);
    (req as any).user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
