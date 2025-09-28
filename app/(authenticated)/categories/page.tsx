import React from "react";
import CategoriesAccordion from "./_components/categories-accordion";
import AddNewCategoryModal from "./_components/add-new-category-modal";

type Props = {};

const categoriesPage = async (props: Props) => {
  return (
    <div>
      <AddNewCategoryModal forChild={false} />
      <div>
        <CategoriesAccordion />
      </div>
    </div>
  );
};

export default categoriesPage;
