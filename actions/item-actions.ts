"use server"

import type { Item } from "@prisma/client"
import { Prisma } from "@prisma/client"
import db from "@/lib/db"
import { getCurrentInternalUser } from "@/lib/services/user-services"

export const getItem = async (id: number): Promise<Item | null> => {
  try {
    const currentUser = await getCurrentInternalUser()
    if (!currentUser) throw new Error("Unauthorized")

    const item = await db.item.findUnique({
      where: { id },
    })

    return item
  } catch (error) {
    console.error("Error fetching item:", error)
    return null
  }
}

export const createItem = async (
  data: Pick<Item, "title" | "description">
): Promise<Item | null> => {
  try {
    const currentUser = await getCurrentInternalUser()
    if (!currentUser) throw new Error("Unauthorized")

    const item = await db.item.create({
      data: {
        title: data.title,
        description: data.description,
        userId: currentUser.id, // 🔑 link item to logged-in user
      },
    })

    return item
  } catch (error) {
    console.error("Error creating item:", error)
    return null
  }
}
