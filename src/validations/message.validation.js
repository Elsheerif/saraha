"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMessageSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createMessageSchema = joi_1.default.object({
    receiverId: joi_1.default.string().hex().length(24).required(),
    content: joi_1.default.string().trim().min(1).max(1000).required(),
});
