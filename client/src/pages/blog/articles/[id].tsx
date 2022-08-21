import { ArticleDTO } from "@common/types";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { Alert, Hero } from "react-daisyui";
import { SWRConfig } from "swr";

import { ArticleContent, ScrollToTop } from "../../../components";
import { WEBSITE_TITLE } from "../../../constants";
import { getArticle, useArticle } from "../../../hooks";

type Props = {
  id: string;
};

const ArticlePage: NextPage<Props> = ({ id }) => {
  const { article, error } = useArticle(id);

  return (
    <>
      <Head>
        <title>{`${article?.title} - ${WEBSITE_TITLE}`}</title>
      </Head>
      {error && (
        <div className={"container mx-auto py-8 px-4"}>
          <Alert className={"mb-4"} status={"error"}>
            {error.message}
          </Alert>
        </div>
      )}
      {article && (
        <>
          <div className={"container mx-auto"}>
            <Hero className={"h-40 bg-base-100"}>
              <Hero.Content>
                <div className={"text-center"}>
                  <h1 className={"mb-1 text-3xl"}>{article.title}</h1>
                  <h2 className={"text-xl"}>{article.description}</h2>
                </div>
              </Hero.Content>
            </Hero>
          </div>
          <hr className={"border-base-200"} />
          <div className={"container mx-auto py-8 px-4"}>
            <ArticleContent content={article.content} />
          </div>
        </>
      )}
      <ScrollToTop />
    </>
  );
};

type SSRProps = {
  id: string;
  fallback: {
    [id: string]: ArticleDTO;
  };
};

const ArticlePageWithSWR: NextPage<SSRProps> = ({ id, fallback }) => {
  return (
    <SWRConfig value={{ fallback }}>
      <ArticlePage id={id} />
    </SWRConfig>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = params?.id as string;
  const { article, error } = await getArticle(id);

  if (error?.code === "NOT_FOUND_RESOURCE") {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      id: id,
      fallback: {
        [`/articles/${id}`]: article ?? null,
      },
    },
  };
};

export default ArticlePageWithSWR;
