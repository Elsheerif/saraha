import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/user.service";

const userService = new UserService();

export const shareProfile = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    await userService.incrementProfileVisits(id);
    const profile = await userService.getProfile(id);
    res.json({ profile, shared: true });
  } catch (error) {
    next(error);
  }
};

export const uploadProfileImage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.userId as string;
    if (!req.file) {
      throw new Error("Profile image file is required");
    }
    const location = `/uploads/${req.file.filename}`;
    await userService.updateProfileImage(userId, location);
    res.json({ message: "Profile image updated", location });
  } catch (error) {
    next(error);
  }
};

export const uploadCoverImages = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.userId as string;
    if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
      throw new Error("At least one cover image is required");
    }
    const locations = (req.files as Express.Multer.File[]).map((file) => `/uploads/${file.filename}`);
    await userService.addCoverImages(userId, locations);
    res.json({ message: "Cover images uploaded", locations });
  } catch (error) {
    next(error);
  }
};

export const updatePrivateNotes = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.userId as string;
    const { notes } = req.body;
    await userService.setPrivateNotes(userId, notes);
    res.json({ message: "Private notes stored securely" });
  } catch (error) {
    next(error);
  }
};
