import { UserModel, IUser } from "../models/user.model";

export class UserRepository {
  async create(user: Partial<IUser>): Promise<IUser> {
    return UserModel.create(user);
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return UserModel.findOne({ email }).exec();
  }

  async findById(id: string): Promise<IUser | null> {
    return UserModel.findById(id).exec();
  }

  async findByOtp(email: string, otpCode: string): Promise<IUser | null> {
    return UserModel.findOne({ email, otpCode }).exec();
  }

  async save(user: IUser): Promise<IUser> {
    return user.save();
  }

  async addRefreshToken(userId: string, token: string): Promise<void> {
    await UserModel.findByIdAndUpdate(userId, { $addToSet: { refreshTokens: token } }).exec();
  }

  async removeRefreshToken(userId: string, token: string): Promise<void> {
    await UserModel.findByIdAndUpdate(userId, { $pull: { refreshTokens: token } }).exec();
  }

  async clearRefreshTokens(userId: string): Promise<void> {
    await UserModel.findByIdAndUpdate(userId, { refreshTokens: [] }).exec();
  }
}
