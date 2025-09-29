import {
  Conversation as PrismaConversation,
  User,
  Message,
} from "@prisma/client";

export type MessageWithUser = Message & {
  user: User;
  replies?: MessageWithUser[];
};

export type MessageWithRelations = MessageWithUser & {
  replies?: MessageWithUser[];
  parent?: MessageWithUser | null;
  conversation?: PrismaConversation;
};

export type ConversationWithUsers = PrismaConversation & {
  userConversations: {
    user: User;
  }[];
  messages: MessageWithUser[];
};
export type ReplyingToType = {
  messageId: number;
  content: string;
  username: string;
} | null;
