import React from "react";
import { CategoryWithChildren } from "@/types/categoryTypes";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import AddNewCategoryModal from "./add-new-category-modal";
import DeleteCategoryModal from "./delete-category-modal";

interface CategoryNodeProps {
  category: CategoryWithChildren;
}

export const CategoryNode = ({ category }: CategoryNodeProps) => {
  return (
    <AccordionItem value={String(category.id)} className="ml-4">
      <div className="flex items-center justify-between">
        <AccordionTrigger className="flex-1 text-left">
          {category.title} - {category.description}
        </AccordionTrigger>

        <AddNewCategoryModal
          parentId={category.id}
          forChild={true}
          parentTitle={category.title}
        />

        <DeleteCategoryModal
          categoryId={category.id}
          categoryTitle={category.title}
        />
      </div>

      <AccordionContent>
        <div className="flex flex-col gap-2">
          {category.children?.length > 0 && (
            <Accordion type="single" collapsible>
              {category.children.map((child) => (
                <CategoryNode key={child.id} category={child} />
              ))}
            </Accordion>
          )}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};
