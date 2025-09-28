"use server";

import db from "@/lib/db";
import { CategoryWithChildren } from "@/types/categoryTypes";

export async function getAllCategories() {
  return await db.category.findMany({ orderBy: { title: "asc" } });
}

export async function createParentCategory(title: string, description: string) {
  return await db.category.create({
    data: { title, description, parentId: null },
  });
}

export async function createChildCategory(
  title: string,
  description: string,
  parentId: number
) {
  return await db.category.create({
    data: { title, description, parentId },
  });
}

export async function destroyCategory(id: number) {
  return await db.category.delete({
    where: { id },
  });
}

// helpers

export async function getStructuredCategories(): Promise<
  (CategoryWithChildren & { path: string[] })[]
> {
  const map = new Map<number, CategoryWithChildren & { path: string[] }>();
  const roots: (CategoryWithChildren & { path: string[] })[] = [];

  let categories = await getAllCategories();

  categories.forEach((cat) =>
    map.set(cat.id, { ...cat, children: [], path: [] })
  );

  map.forEach((cat) => {
    if (cat.parentId) {
      const parent = map.get(cat.parentId);
      if (parent) {
        parent.children?.push(cat);
        cat.path = [...parent.path, parent.title];
      }
    } else {
      roots.push(cat);
    }
  });

  return roots;
}
