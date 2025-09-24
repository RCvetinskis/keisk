"use server";

import db from "@/lib/db";
import { PAGE_SIZE } from "../constants";
export const conversationMessages = async ({
  conversationId,
  page = 1,
  query,
}: {
  conversationId: number;
  page?: 1;
  query?: string;
}) => {
  const messages = db.message.findMany({
    where: {
      conversationId,
    },
    skip: (page - 1) * PAGE_SIZE,
    take: PAGE_SIZE,
  });

  return messages || [];
};
