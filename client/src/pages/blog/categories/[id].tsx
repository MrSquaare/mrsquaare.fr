import { CategoryDTO } from "@common/types";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { Alert, Hero } from "react-daisyui";
import { SWRConfig } from "swr";

import { ArticleList } from "../../../components";
import { WEBSITE_TITLE } from "../../../constants";
import {
  getArticles,
  getCategory,
  useArticles,
  useCategory,
} from "../../../hooks";

type Props = {
  id: string;
};

const CategoryPage: NextPage<Props> = ({ id }) => {
  const { articles, error: articlesError } = useArticles();
  const { category, error: categoryError } = useCategory(id);

  return (
    <>
      <Head>
        <title>{`${category?.name} - ${WEBSITE_TITLE}`}</title>
      </Head>
      {(articlesError || categoryError) && (
        <div className={"container mx-auto py-8 px-4"}>
          <Alert className={"mb-4"} status={"error"}>
            {articlesError?.message || null}
            {categoryError?.message || null}
          </Alert>
        </div>
      )}
      {category && articles && (
        <>
          <div className={"container mx-auto"}>
            <Hero className={"h-40 bg-base-100"}>
              <Hero.Content>
                <div className={"text-center"}>
                  <h1 className={"mb-1 text-3xl"}>{category.name}</h1>
                </div>
              </Hero.Content>
            </Hero>
          </div>
          <hr className={"border-base-200"} />
          <div className={"container mx-auto py-8 px-4"}>
            <ArticleList
              articles={articles.filter((article) => {
                return article.categories.includes(category.id);
              })}
            />
          </div>
        </>
      )}
    </>
  );
};

type SSRProps = {
  id: string;
  fallback: {
    [id: string]: CategoryDTO;
  };
};

const CategoryPageWithSWR: NextPage<SSRProps> = ({ id, fallback }) => {
  return (
    <SWRConfig value={{ fallback }}>
      <CategoryPage id={id} />
    </SWRConfig>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = params?.id as string;
  const { articles } = await getArticles();
  const { category, error } = await getCategory(id);

  if (error?.code === "NOT_FOUND_RESOURCE") {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      id: id,
      fallback: {
        "/articles": articles ?? null,
        [`/categories/${id}`]: category ?? null,
      },
    },
  };
};

export default CategoryPageWithSWR;
