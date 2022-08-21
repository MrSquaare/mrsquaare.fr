import { ArticleMetaDTO } from "@common/types";
import Link from "next/link";
import { FC } from "react";
import { Card } from "react-daisyui";
import urlJoin from "url-join";

import { API_BASE_URL } from "../../constants";

type Props = {
  article: ArticleMetaDTO;
};

export const ArticleCard: FC<Props> = ({ article }) => {
  return (
    <Link href={`/blog/articles/${article.id}`}>
      <a>
        <Card className={"bg-base-200"}>
          <div className={"h-40"}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt={"Image"}
              className={"h-full w-full object-cover"}
              src={urlJoin(API_BASE_URL, article.image)}
            />
          </div>
          <Card.Body className={"h-40"}>
            <Card.Title tag={"h2"}>{article.title}</Card.Title>
            <p className={"overflow-hidden text-ellipsis"}>
              {article.description}
            </p>
          </Card.Body>
        </Card>
      </a>
    </Link>
  );
};
