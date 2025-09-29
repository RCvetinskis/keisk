"use server";

import { getCurrentInternalUser } from "@/lib/services/user-services";
import db from "@/lib/db";

export const upsertConversations = async ({
  receiverId,
}: {
  receiverId: number;
}) => {
  const currentUser = await getCurrentInternalUser();
  if (!currentUser) throw new Error("User not authenticated");

  const receiver = await db.user.findUnique({ where: { id: receiverId } });
  if (!receiver) throw new Error("Receiver not found");

  let conversation = await db.conversation.findFirst({
    where: {
      userConversations: {
        some: { userId: currentUser.id },
      },
      AND: {
        userConversations: {
          some: { userId: receiver.id },
        },
      },
    },
    include: {
      userConversations: {
        include: { user: true },
      },
      messages: {
        orderBy: { createdAt: "desc" },
        take: 1,
        include: { user: true },
      },
    },
  });

  if (!conversation) {
    conversation = await db.conversation.create({
      data: {
        name: `${currentUser.username} & ${receiver.username}`,
        userConversations: {
          create: [{ userId: currentUser.id }, { userId: receiver.id }],
        },
        messages: {
          create: {
            content: `${currentUser.username} has started a conversation`,
            userId: currentUser.id,
          },
        },
      },
      include: {
        userConversations: { include: { user: true } },
        messages: { include: { user: true } },
      },
    });
  }

  return conversation;
};
