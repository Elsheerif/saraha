"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageService = void 0;
const message_repository_1 = require("../repositories/message.repository");
class MessageService {
    constructor() {
        this.repository = new message_repository_1.MessageRepository();
    }
    async create(senderId, receiverId, content) {
        return this.repository.create({ sender: senderId, receiver: receiverId ? receiverId : undefined, content });
    }
    async listForUser(userId) {
        return this.repository.findForUser(userId);
    }
}
exports.MessageService = MessageService;
//# sourceMappingURL=message.service.js.map