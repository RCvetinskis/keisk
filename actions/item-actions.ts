"use server";

import type { Item } from "@prisma/client";
import { Prisma } from "@prisma/client";
import db from "@/lib/db";
import { getCurrentInternalUser } from "@/lib/services/user-services";
import { redirect } from "next/navigation";

// usage: await getItem(123)
export const getItem = async (id: number): Promise<Item | null> => {
  try {
    const currentUser = await getCurrentInternalUser();
    if (!currentUser) throw new Error("Unauthorized");

    return await db.item.findUnique({
      where: {
        id_userId: {
          id,
          userId: currentUser.id,
        },
      },
    });
  } catch (error) {
    console.error("Error fetching item:", error);
    return null;
  }
};

export const createItem = async (
  data: Omit<Prisma.ItemUncheckedCreateInput, "userId">
): Promise<Item | null> => {
  try {
    const currentUser = await getCurrentInternalUser();
    if (!currentUser) throw new Error("Unauthorized");

    return await db.item.create({
      data: {
        ...data,
        userId: currentUser.id,
      },
    });

    redirect("/items");
  } catch (error) {
    console.error("Error creating item:", error);
    return null;
  }
};

// usage: await deleteItem(123)
export const deleteItem = async (id: number): Promise<Item | null> => {
  try {
    const currentUser = await getCurrentInternalUser();
    if (!currentUser) throw new Error("Unauthorized");

    return await db.item.delete({
      where: {
        id_userId: {
          id,
          userId: currentUser.id,
        },
      },
    });
  } catch (error) {
    console.error("Error deleting item:", error);
    return null;
  }
};

// usage: await updateItem(123, { title: "New Title" })
export const updateItem = async (
  id: number,
  data: Prisma.ItemUpdateInput
): Promise<Item | null> => {
  try {
    const currentUser = await getCurrentInternalUser();
    if (!currentUser) throw new Error("Unauthorized");

    return await db.item.update({
      where: {
        id_userId: {
          id,
          userId: currentUser.id,
        },
      },
      data,
    });
  } catch (error) {
    console.error("Error updating item:", error);
    return null;
  }
};

export const getAllUsersItems = async (): Promise<Item[]> => {
  try {
    const currentUser = await getCurrentInternalUser();
    if (!currentUser) throw new Error("Unauthorized");

    return await db.item.findMany({
      where: {
        userId: currentUser.id,
      },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Error fetching user items:", error);
    return [];
  }
};

// usage: await getAllItems()
export const getAllItems = async (): Promise<Item[]> => {
  try {
    return await db.item.findMany({
      include: {
        user: true, // if you want to show the owner info
      },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Error fetching all items:", error);
    return [];
  }
};
