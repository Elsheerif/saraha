"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageRepository = void 0;
const message_model_1 = require("../models/message.model");
class MessageRepository {
    async create(message) {
        return message_model_1.MessageModel.create(message);
    }
    async findForUser(userId) {
        return message_model_1.MessageModel.find({ $or: [{ sender: userId }, { receiver: userId }] })
            .sort({ createdAt: -1 })
            .populate("sender", "name email")
            .populate("receiver", "name email")
            .exec();
    }
}
exports.MessageRepository = MessageRepository;
//# sourceMappingURL=message.repository.js.map