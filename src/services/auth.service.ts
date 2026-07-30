import bcrypt from "bcryptjs";
import { UserRepository } from "../repositories/user.repository";
import { TokenService, JwtPayload } from "./token.service";
import { createOtp } from "../utils/otp.util";
import { sendEmail } from "./email.service";
import { env } from "../config/env";
import { IUser } from "../models/user.model";

export class AuthService {
  public userRepository = new UserRepository();
  private tokenService = new TokenService();

  async signup(data: { name: string; email: string; password: string }): Promise<{ user: IUser; otpCode: string }> {
    const existing = await this.userRepository.findByEmail(data.email);
    if (existing) {
      throw new Error("Email is already registered");
    }

    const password = await bcrypt.hash(data.password, env.passwordSaltRounds);
    const otpCode = createOtp(6);
    const otpExpires = new Date(Date.now() + 1000 * 60 * 5);

    const user = await this.userRepository.create({
      name: data.name,
      email: data.email,
      password,
      otpCode,
      otpExpires,
      verified: false,
      refreshTokens: [],
    });

    await sendEmail(
      data.email,
      "Welcome to Saraha - Confirm your email",
      `Dear ${data.name},\n\nYour verification code is ${otpCode}. It expires in 5 minutes.\n\nThank you.`
    );

    return { user, otpCode };
  }

  async verifyEmail(email: string, otpCode: string): Promise<IUser> {
    const user = await this.userRepository.findByOtp(email, otpCode);
    if (!user) {
      throw new Error("Invalid verification code");
    }
    if (!user.otpExpires || user.otpExpires < new Date()) {
      throw new Error("OTP has expired");
    }
    user.verified = true;
    user.otpCode = undefined;
    user.otpExpires = undefined;
    return this.userRepository.save(user);
  }

  async login(email: string, password: string): Promise<{ accessToken: string; refreshToken: string; user: IUser }> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error("Invalid credentials");
    }

    if (user.lockedUntil && user.lockedUntil > new Date()) {
      throw new Error("Account is temporarily locked due to failed login attempts");
    }

    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) {
      user.loginAttempts += 1;
      if (user.loginAttempts >= 5) {
        user.lockedUntil = new Date(Date.now() + 5 * 60 * 1000);
      }
      await this.userRepository.save(user);
      throw new Error("Invalid credentials");
    }

    if (!user.verified) {
      throw new Error("Email verification is required before logging in");
    }

    user.loginAttempts = 0;
    user.lockedUntil = undefined;
    await this.userRepository.save(user);

    const payload: JwtPayload = { userId: user.id, role: user.role };
    const accessToken = this.tokenService.createAccessToken(payload);
    const refreshToken = this.tokenService.createRefreshToken(payload);
    await this.userRepository.addRefreshToken(user.id, refreshToken);

    return { accessToken, refreshToken, user };
  }

  async refresh(refreshToken: string): Promise<{ accessToken: string; refreshToken: string }> {
    const decoded = this.tokenService.verifyToken<JwtPayload>(refreshToken);
    const user = await this.userRepository.findById(decoded.userId);
    if (!user) {
      throw new Error("Refresh token is invalid");
    }
    if (!user.refreshTokens.includes(refreshToken)) {
      throw new Error("Refresh token is revoked");
    }

    const payload: JwtPayload = { userId: user.id, role: user.role };
    const accessToken = this.tokenService.createAccessToken(payload);
    const newRefreshToken = this.tokenService.createRefreshToken(payload);
    await this.userRepository.removeRefreshToken(user.id, refreshToken);
    await this.userRepository.addRefreshToken(user.id, newRefreshToken);

    return { accessToken, refreshToken: newRefreshToken };
  }

  async logout(userId: string, refreshToken: string): Promise<void> {
    await this.userRepository.removeRefreshToken(userId, refreshToken);
  }

  async logoutAll(userId: string): Promise<void> {
    await this.userRepository.clearRefreshTokens(userId);
  }
}
