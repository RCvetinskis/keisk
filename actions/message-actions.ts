"use server";
// import { getCurrentInternalUser } from "@/lib/services/user-services";
import db from "@/lib/db";
import { revalidatePath } from "next/cache";

export const createMessage = async ({
  conversationId,
  content,
}: {
  conversationId: number;
  content: string;
}) => {
  try {
    const conversation = await db.conversation.findFirst({
      where: {
        id: conversationId,
        users: {
          some: { id: 1 },
        },
      },
    });

    if (!conversation) throw new Error("Conversation not found");

    const message = await db.message.create({
      data: {
        content: content,
        conversationId: conversation.id,
        userId: 1,
      },
    });

    revalidatePath(`/conversations/${conversation.id}`);
    return message;
  } catch (error) {}
};
