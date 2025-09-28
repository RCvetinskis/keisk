import { getStructuredCategories } from "@/actions/category-actions";
import { CategoryNode } from "./category-node";
import { Accordion } from "@/components/ui/accordion";

const CategoriesAccordion = async () => {
  const structuredCategories = await getStructuredCategories();

  return (
    <Accordion type="single" collapsible>
      <div className="space-y-4">
        {structuredCategories.map((cat) => (
          <CategoryNode key={cat.id} category={cat} />
        ))}
      </div>
    </Accordion>
  );
};

export default CategoriesAccordion;
