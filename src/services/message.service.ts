import { MessageRepository } from "../repositories/message.repository";
import { IMessage } from "../models/message.model";

export class MessageService {
  private repository = new MessageRepository();

  async create(senderId: string, receiverId: string | undefined, content: string): Promise<IMessage> {
    return this.repository.create({ sender: senderId as any, receiver: receiverId ? (receiverId as any) : undefined, content });
  }

  async listForUser(userId: string): Promise<IMessage[]> {
    return this.repository.findForUser(userId);
  }
}
