"use client";

import React, { useState, useEffect } from "react";
import {
  createChildCategory,
  getAllCategories,
  createParentCategory,
  destroyCategory,
} from "@/actions/category-actions";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Category = {
  id: number;
  title: string;
  description: string;
  parentId: number | null;
  children?: Category[];
};

function buildTree(categories: Category[]): Category[] {
  const map = new Map<number, Category>();
  const roots: Category[] = [];

  categories.forEach((cat) => map.set(cat.id, { ...cat, children: [] }));

  map.forEach((cat) => {
    if (cat.parentId) {
      const parent = map.get(cat.parentId);
      parent?.children?.push(cat);
    } else {
      roots.push(cat);
    }
  });

  return roots;
}

const CategoryNode = ({
  category,
  refresh,
}: {
  category: Category;
  refresh: () => void;
}) => {
  const [childTitle, setChildTitle] = useState("");

  const handleAddChild = async () => {
    if (!childTitle.trim()) return;
    await createChildCategory(childTitle, category.id);
    setChildTitle("");
    refresh();
  };

  return (
    <AccordionItem value={String(category.id)}>
      <div className="flex items-center justify-between gap-2">
        <AccordionTrigger>{category.title}</AccordionTrigger>
        <Button
          onClick={async () => {
            await destroyCategory(category.id);
            refresh();
          }}
        >
          Delete
        </Button>
      </div>
      <AccordionContent>
        {category.children?.length ? (
          <Accordion type="single" collapsible>
            {category.children.map((child) => (
              <div key={child.id}>
                <CategoryNode category={child} refresh={refresh} />
                <div className="pl-4 text-sm text-muted-foreground">
                  {child.description}
                </div>
              </div>
            ))}
          </Accordion>
        ) : (
          <p className="text-sm text-muted-foreground">No child categories</p>
        )}

        {/* Add child input */}
        <div className="mt-2 flex gap-2">
          <Input
            placeholder="New child category"
            value={childTitle}
            onChange={(e) => setChildTitle(e.target.value)}
          />
          <Button onClick={handleAddChild} size="sm">
            Add
          </Button>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

const CategoriesAccordion = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [parentTitle, setParentTitle] = useState("");

  const loadCategories = async () => {
    const all = await getAllCategories();
    setCategories(all);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleAddParent = async () => {
    if (!parentTitle.trim()) return;
    await createParentCategory(parentTitle);
    setParentTitle("");
    loadCategories();
  };

  const tree = buildTree(categories);

  return (
    <div className="space-y-4">
      {/* Add parent input */}
      <div className="flex gap-2">
        <Input
          placeholder="New parent category"
          value={parentTitle}
          onChange={(e) => setParentTitle(e.target.value)}
        />
        <Button onClick={handleAddParent}>Add Parent</Button>
      </div>

      {/* Nested categories */}
      <Accordion type="single" collapsible>
        {tree.map((category) => (
          <CategoryNode
            key={category.id}
            category={category}
            refresh={loadCategories}
          />
        ))}
      </Accordion>
    </div>
  );
};

export default CategoriesAccordion;
