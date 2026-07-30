import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  verified: boolean;
  otpCode?: string;
  otpExpires?: Date;
  refreshTokens: string[];
  profileImage?: string;
  coverImages: string[];
  galleryImages: string[];
  visitCount: number;
  loginAttempts: number;
  lockedUntil?: Date;
  twoFactorEnabled: boolean;
  privateNotes?: string;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ["user", "admin"], default: "user" },
    verified: { type: Boolean, default: false },
    otpCode: { type: String },
    otpExpires: { type: Date },
    refreshTokens: { type: [String], default: [] },
    profileImage: { type: String },
    coverImages: { type: [String], default: [] },
    galleryImages: { type: [String], default: [] },
    visitCount: { type: Number, default: 0 },
    loginAttempts: { type: Number, default: 0 },
    lockedUntil: { type: Date },
    twoFactorEnabled: { type: Boolean, default: false },
    privateNotes: { type: String },
  },
  { timestamps: true }
);

userSchema.index({ email: 1 });
userSchema.index({ otpExpires: 1 }, { expireAfterSeconds: 0 });

export const UserModel = mongoose.model<IUser>("User", userSchema);
