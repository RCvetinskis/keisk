"use server";

import { getCurrentInternalUser } from "@/lib/services/user-services";
import db from "@/lib/db";
export const upsertConversations = async ({
  receiverId,
}: {
  receiverId: number;
}) => {
  try {
    const currentUser = await getCurrentInternalUser();
    if (!currentUser) throw new Error("User not authenticated");

    const receiver = await db.user.findFirst({
      where: {
        id: receiverId,
      },
    });

    if (!receiver) throw new Error("Receiver not found");

    let conversation = await db.conversation.findFirst({
      where: {
        users: {
          some: { id: currentUser.id },
        },
        AND: {
          users: {
            some: { id: receiver.id },
          },
        },
      },
      include: {
        users: true,
      },
    });

    if (!conversation) {
      conversation = await db.conversation.create({
        data: {
          name: `${currentUser.username} & ${receiver.username}`,
          users: {
            connect: [{ id: currentUser.id }, { id: receiverId }],
          },
          messages: {
            create: {
              content: `${currentUser.username} has started conversations`,
              userId: currentUser.id,
            },
          },
        },
        include: {
          users: true,
        },
      });
    }
    return conversation;
  } catch (error) {}
};
