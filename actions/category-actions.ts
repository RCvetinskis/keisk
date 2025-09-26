// actions/category-actions.ts
"use server";

import db from "@/lib/db";

export async function getAllCategories() {
  return await db.category.findMany({ orderBy: { title: "asc" } });
}

export async function createParentCategory(title: string) {
  return await db.category.create({ data: { title, parentId: null } });
}

export async function createChildCategory(title: string, parentId: number) {
  return await db.category.create({
    data: { title: "kazkoks aprasymas", parentId },
  });
}

export async function destroyCategory(id: number) {
  return await db.category.delete({
    where: { id },
  });
}
