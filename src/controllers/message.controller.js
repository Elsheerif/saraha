"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listMessages = exports.createMessage = void 0;
const message_service_1 = require("../services/message.service");
const messageService = new message_service_1.MessageService();
const createMessage = async (req, res, next) => {
    try {
        const senderId = req.user?.userId;
        const { receiverId, content } = req.body;
        const message = await messageService.create(senderId, receiverId, content);
        res.status(201).json({ message });
    }
    catch (error) {
        next(error);
    }
};
exports.createMessage = createMessage;
const listMessages = async (req, res, next) => {
    try {
        const userId = req.user?.userId;
        const messages = await messageService.listForUser(userId);
        res.json({ messages });
    }
    catch (error) {
        next(error);
    }
};
exports.listMessages = listMessages;
//# sourceMappingURL=message.controller.js.map