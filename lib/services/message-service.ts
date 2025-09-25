"use server";
import db from "@/lib/db";
import { PAGE_SIZE } from "../constants";

export const conversationMessages = async ({
  conversationId,
  page = 1,
  query,
}: {
  conversationId: number;
  page?: number;
  query?: string;
}) => {
  const messages = await db.message.findMany({
    where: {
      conversationId,
      parentId: null,
      content: query ? { contains: query } : undefined,
    },
    orderBy: { updatedAt: "desc" },
    skip: (page - 1) * PAGE_SIZE,
    take: PAGE_SIZE + 1,
    include: {
      user: true,
      replies: {
        include: { user: true, replies: { include: { user: true } } },
      },
    },
  });

  const hasMore = messages.length > PAGE_SIZE;

  const slicedMessages = messages.slice(0, PAGE_SIZE).reverse();

  return { messages: slicedMessages, hasMore };
};
