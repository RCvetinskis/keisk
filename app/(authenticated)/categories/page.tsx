import React from "react";
import CategoriesAccordion from "./_components/categories-accordion";

type Props = {};

const categoriesPage = async (props: Props) => {
  return (
    <div>
      <div>
        <CategoriesAccordion />
      </div>
    </div>
  );
};

export default categoriesPage;
