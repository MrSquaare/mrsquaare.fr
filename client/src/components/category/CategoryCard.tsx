import { CategoryDTO } from "@common/types";
import Link from "next/link";
import { FC } from "react";
import { Card } from "react-daisyui";
import urlJoin from "url-join";

import { API_BASE_URL } from "../../constants";

type Props = {
  category: CategoryDTO;
};

export const CategoryCard: FC<Props> = ({ category }) => {
  return (
    <Link href={`/blog/categories/${category.id}`}>
      <Card className={"bg-base-200"} imageFull>
        <Card.Image alt={"Image"} src={urlJoin(API_BASE_URL, category.image)} />
        <Card.Body className={"d-flex items-center justify-center"}>
          <Card.Title className={"text-3xl"} tag={"h2"}>
            {category.name}
          </Card.Title>
        </Card.Body>
      </Card>
    </Link>
  );
};
