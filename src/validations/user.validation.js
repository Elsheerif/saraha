"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.privateNotesSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.privateNotesSchema = joi_1.default.object({
    notes: joi_1.default.string().trim().max(2000).required(),
});
//# sourceMappingURL=user.validation.js.map