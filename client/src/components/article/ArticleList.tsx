import { ArticleMetaDTO } from "@common/types";
import { FC } from "react";

import { ArticleCard } from "./ArticleCard";

type Props = {
  articles: ArticleMetaDTO[];
};

export const ArticleList: FC<Props> = ({ articles }) => {
  return (
    <div className={"grid grid-cols-1 gap-4 lg:grid-cols-2"}>
      {articles.map((article) => {
        return <ArticleCard article={article} key={article.id} />;
      })}
    </div>
  );
};
