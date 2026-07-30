import { MessageModel, IMessage } from "../models/message.model";

export class MessageRepository {
  async create(message: Partial<IMessage>): Promise<IMessage> {
    return MessageModel.create(message);
  }

  async findForUser(userId: string): Promise<IMessage[]> {
    return MessageModel.find({ $or: [{ sender: userId }, { receiver: userId }] })
      .sort({ createdAt: -1 })
      .populate("sender", "name email")
      .populate("receiver", "name email")
      .exec();
  }
}
