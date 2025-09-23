"use server";

import { getCurrentInternalUser } from "@/lib/services/user-services";
import db from "@/lib/db";
export const createConversation = async ({
  receiverId,
  content,
}: {
  receiverId: number;
  content: string;
}) => {
  try {
    const currentUser = await getCurrentInternalUser();
    if (!currentUser) throw new Error("User not authenticated");

    const conversation = await db.conversation.create({
      data: {
        name: null,
        users: {
          connect: [{ id: currentUser.id }, { id: receiverId }],
        },
        messages: {
          create: {
            content,
            userId: currentUser.id,
          },
        },
      },
      include: {
        users: true,
        messages: true,
      },
    });
    return conversation;
  } catch (error) {}
};
