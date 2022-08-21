import { CategoryDTO } from "@common/types";
import { FC } from "react";

import { CategoryCard } from "./CategoryCard";

type Props = {
  categories: CategoryDTO[];
};

export const CategoryList: FC<Props> = ({ categories }) => {
  return (
    <div className={"grid grid-cols-2 gap-4 lg:grid-cols-3"}>
      {categories.map((category) => {
        return <CategoryCard category={category} key={category.id} />;
      })}
    </div>
  );
};
