import { UserRepository } from "../repositories/user.repository";
import { IUser } from "../models/user.model";
import { decryptText, encryptText } from "../utils/crypto.util";

export class UserService {
  private userRepository = new UserRepository();

  async getProfile(userId: string): Promise<Partial<IUser>> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      verified: user.verified,
      profileImage: user.profileImage,
      coverImages: user.coverImages,
      galleryImages: user.galleryImages,
      visitCount: user.visitCount,
      privateNotes: user.privateNotes ? decryptText(user.privateNotes) : undefined,
    };
  }

  async incrementProfileVisits(userId: string): Promise<void> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    user.visitCount += 1;
    await this.userRepository.save(user);
  }

  async updateProfileImage(userId: string, imagePath: string): Promise<void> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    if (user.profileImage) {
      user.galleryImages.push(user.profileImage);
    }
    user.profileImage = imagePath;
    await this.userRepository.save(user);
  }

  async addCoverImages(userId: string, imagePaths: string[]): Promise<void> {
    const user = await this.userRepository.findById(userId);
    if (!user) throw new Error("User not found");
    user.coverImages = [...user.coverImages, ...imagePaths].slice(0, 2);
    await this.userRepository.save(user);
  }

  async setPrivateNotes(userId: string, notes: string): Promise<void> {
    const user = await this.userRepository.findById(userId);
    if (!user) throw new Error("User not found");
    user.privateNotes = encryptText(notes);
    await this.userRepository.save(user);
  }
}
