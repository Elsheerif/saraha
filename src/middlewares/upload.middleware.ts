import multer from "multer";
import path from "path";
import fs from "fs";

const uploadDirectory = path.resolve(process.cwd(), "public", "uploads");
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDirectory),
  filename: (_req, file, cb) => {
    const safeName = `${Date.now()}-${file.originalname.replace(/[^a-zA-Z0-9.-]/g, "-")}`;
    cb(null, safeName);
  },
});

export const uploadProfileImage = multer({
  storage,
  fileFilter: (_req, file, cb) => cb(null, file.mimetype.startsWith("image/")),
  limits: { fileSize: 5 * 1024 * 1024 },
}).single("profileImage");

export const uploadCoverImages = multer({
  storage,
  fileFilter: (_req, file, cb) => cb(null, file.mimetype.startsWith("image/")),
  limits: { fileSize: 5 * 1024 * 1024 },
}).array("coverImages", 2);
