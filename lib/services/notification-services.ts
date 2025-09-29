"use server";

import { getCurrentInternalUser } from "./user-services";
import db from "../db";
// TODO on on conversation open/redirection mark notification isRead true
export const userNotificationCount = async () => {
  const currentUser = await getCurrentInternalUser();

  if (!currentUser) return 0;

  const count = await db.notification.count({
    where: {
      userId: currentUser.id,
      isRead: false,
    },
  });

  return count || 0;
};
