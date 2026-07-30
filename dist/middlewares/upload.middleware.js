"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadCoverImages = exports.uploadProfileImage = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const uploadDirectory = path_1.default.resolve(process.cwd(), "public", "uploads");
if (!fs_1.default.existsSync(uploadDirectory)) {
    fs_1.default.mkdirSync(uploadDirectory, { recursive: true });
}
const storage = multer_1.default.diskStorage({
    destination: (_req, _file, cb) => cb(null, uploadDirectory),
    filename: (_req, file, cb) => {
        const safeName = `${Date.now()}-${file.originalname.replace(/[^a-zA-Z0-9.-]/g, "-")}`;
        cb(null, safeName);
    },
});
exports.uploadProfileImage = (0, multer_1.default)({
    storage,
    fileFilter: (_req, file, cb) => cb(null, file.mimetype.startsWith("image/")),
    limits: { fileSize: 5 * 1024 * 1024 },
}).single("profileImage");
exports.uploadCoverImages = (0, multer_1.default)({
    storage,
    fileFilter: (_req, file, cb) => cb(null, file.mimetype.startsWith("image/")),
    limits: { fileSize: 5 * 1024 * 1024 },
}).array("coverImages", 2);
//# sourceMappingURL=upload.middleware.js.map