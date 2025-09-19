import { currentUser } from "@clerk/nextjs/server";
import db from "../db";
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
