"use server";

import db from "@/lib/db";
import { getCurrentInternalUser } from "@/lib/services/user-services";
import { revalidatePath } from "next/cache";

export const createMessage = async ({
  conversationId,
  content,
}: {
  conversationId: number;
  content: string;
}) => {
  try {
    const currentUser = await getCurrentInternalUser();
    if (!currentUser) throw new Error("User not found");

    const conversation = await db.conversation.findFirst({
      where: {
        id: conversationId,
        users: {
          some: { id: currentUser.id },
        },
      },
    });

    if (!conversation) throw new Error("Conversation not found");

    const message = await db.message.create({
      data: {
        content: content,
        conversationId: conversation.id,
        userId: currentUser.id,
      },
    });

    revalidatePath(`/conversations/${conversation.id}`);
    return message;
  } catch (error) {}
};

export const handleDeleteMessage = async (messageId: number) => {
  try {
    const message = await db.message.findFirst({
      where: {
        id: messageId,
      },
    });

    if (!message) throw new Error("Message not found");

    await db.message.delete({
      where: {
        id: messageId,
      },
    });

    revalidatePath(`/conversations/${message.conversationId}`);
  } catch (error) {
    throw error;
  }
};
