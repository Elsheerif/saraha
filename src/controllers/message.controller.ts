import { Request, Response, NextFunction } from "express";
import { MessageService } from "../services/message.service";

const messageService = new MessageService();

export const createMessage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const senderId = req.user?.userId as string;
    const { receiverId, content } = req.body;
    const message = await messageService.create(senderId, receiverId, content);
    res.status(201).json({ message });
  } catch (error) {
    next(error);
  }
};

export const listMessages = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.userId as string;
    const messages = await messageService.listForUser(userId);
    res.json({ messages });
  } catch (error) {
    next(error);
  }
};
