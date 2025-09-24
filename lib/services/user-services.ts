import { currentUser } from "@clerk/nextjs/server";
import db from "../db";
import { PAGE_SIZE } from "../constants";
export const getCurrentInternalUser = async () => {
  try {
    const externaluser = await currentUser();

    if (!externaluser) {
      throw new Error("Unauthorized");
    }

    const user = await db.user.findUnique({
      where: {
        externalId: externaluser.id,
      },
    });

    return user;
  } catch (error) {
    console.log("error getting currentUser", error);
    return null;
  }
};

export const getOtherUsers = async ({
  page = 1,
  query,
}: {
  page?: number;
  query?: string;
}) => {
  const currentUser = await getCurrentInternalUser();
  if (!currentUser) throw new Error("User not authenticated");
  const users = await db.user.findMany({
    where: {
      id: { not: currentUser.id },
      ...(query ? { username: { contains: query } } : {}),
    },
    skip: (page - 1) * PAGE_SIZE,
    take: PAGE_SIZE,
  });
  return users;
};
