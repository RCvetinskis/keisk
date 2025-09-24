import {
  Conversation as PrismaConversation,
  User,
  Message,
} from "@prisma/client";

export type MessageWithUser = Message & {
  user: User;
};

export type ConversationWithUsers = PrismaConversation & {
  users: User[];
  messages: MessageWithUser[];
};
