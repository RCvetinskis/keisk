"use server";
import { PAGE_SIZE } from "../constants";
import db from "../db";
import { getCurrentInternalUser, getOtherUsers } from "./user-services";

export const userConversations = async ({
  page = 1,
  query,
}: {
  page?: number;
  query?: string;
}) => {
  const currentUser = await getCurrentInternalUser();
  if (!currentUser) throw new Error("User not authenticated");

  const conversations = await db.conversation.findMany({
    where: {
      userConversations: {
        some: { userId: currentUser.id },
      },
      ...(query
        ? {
            OR: [
              { name: { contains: query } },
              {
                userConversations: {
                  some: { user: { username: { contains: query } } },
                },
              },
            ],
          }
        : {}),
    },
    include: {
      userConversations: {
        include: {
          user: true,
        },
      },
      messages: {
        orderBy: { createdAt: "desc" },
        take: 1,
        include: {
          user: true,
        },
      },
    },
    orderBy: {
      updatedAt: "desc",
    },
    skip: (page - 1) * PAGE_SIZE,
    take: PAGE_SIZE,
  });

  return conversations || (await getOtherUsers({})) || [];
};

export default userConversations;
