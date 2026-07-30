import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/auth.service";
import { TokenService } from "../services/token.service";
import { UserRepository } from "../repositories/user.repository";
import { OAuth2Client } from "google-auth-library";
import { env } from "../config/env";

const authService = new AuthService();
const tokenService = new TokenService();
const userRepository = new UserRepository();
const googleClient = new OAuth2Client(env.googleClientId);

export const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password } = req.body;
    const result = await authService.signup({ name, email, password });
    res.status(201).json({ message: "Signup successful", userId: result.user.id, otpCode: result.otpCode });
  } catch (error) {
    next(error);
  }
};

export const verifyEmail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, otpCode } = req.body;
    const user = await authService.verifyEmail(email, otpCode);
    res.json({ message: "Email verified", userId: user.id });
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const { accessToken, refreshToken, user } = await authService.login(email, password);
    res.json({ accessToken, refreshToken, user: { id: user.id, email: user.email, name: user.name, role: user.role } });
  } catch (error) {
    next(error);
  }
};

export const refresh = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { refreshToken } = req.body;
    const tokens = await authService.refresh(refreshToken);
    res.json(tokens);
  } catch (error) {
    next(error);
  }
};

export const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.userId as string;
    const { refreshToken } = req.body;
    await authService.logout(userId, refreshToken);
    res.json({ message: "Logged out from current device" });
  } catch (error) {
    next(error);
  }
};

export const logoutAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.userId as string;
    await authService.logoutAll(userId);
    res.json({ message: "Logged out from all devices" });
  } catch (error) {
    next(error);
  }
};

export const googleLogin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { idToken } = req.body;
    if (!idToken) {
      throw new Error("Google ID token is required");
    }
    const ticket = await googleClient.verifyIdToken({ idToken, audience: env.googleClientId });
    const payload = ticket.getPayload();
    if (!payload?.email || !payload.name) {
      throw new Error("Unable to verify Google account");
    }

    let user = await userRepository.findByEmail(payload.email);
    if (!user) {
      const password = Math.random().toString(36).slice(-12);
      const result = await authService.signup({ name: payload.name, email: payload.email, password });
      user = result.user;
      user.verified = true;
      await userRepository.save(user);
    }
    const payloadToken = { userId: user.id, role: user.role };
    const accessToken = tokenService.createAccessToken(payloadToken);
    const refreshToken = tokenService.createRefreshToken(payloadToken);
    await userRepository.addRefreshToken(user.id, refreshToken);
    res.json({ accessToken, refreshToken, user: { id: user.id, email: user.email, name: user.name } });
  } catch (error) {
    next(error);
  }
};

export const profile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.userId as string;
    if (!userId) {
      throw new Error("Unauthorized");
    }
    const result = await userRepository.findById(userId);
    if (!result) {
      throw new Error("User not found");
    }
    res.json({ id: result.id, name: result.name, email: result.email, role: result.role, verified: result.verified, profileImage: result.profileImage, coverImages: result.coverImages, galleryImages: result.galleryImages });
  } catch (error) {
    next(error);
  }
};
