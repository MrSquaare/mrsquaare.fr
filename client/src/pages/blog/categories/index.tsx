import { CategoryDTO } from "@common/types";
import sadIcon from "@iconify/icons-twemoji/sad-but-relieved-face";
import { Icon } from "@iconify/react";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { Alert, Hero } from "react-daisyui";
import { useTranslation } from "react-i18next";
import { SWRConfig } from "swr";

import { CategoryList } from "../../../components";
import { WEBSITE_TITLE } from "../../../constants";
import { getCategories, useCategories } from "../../../hooks";

const CategoriesPage: NextPage = () => {
  const { locale } = useRouter();
  const { t } = useTranslation("blog", { keyPrefix: "categories" });
  const { categories, error } = useCategories();

  return (
    <>
      <Head>
        <title>
          {`${t("page.title", { lng: locale })} - ${WEBSITE_TITLE}`}
        </title>
      </Head>
      <div className={"container mx-auto"}>
        <Hero className={"h-40 bg-base-100"}>
          <Hero.Content>
            <div className={"text-center"}>
              <h1 className={"mb-1 text-3xl"}>
                {t("header.title", { lng: locale })}
              </h1>
            </div>
          </Hero.Content>
        </Hero>
      </div>
      <hr className={"border-base-200"} />
      <div className={"container mx-auto h-full px-4 py-8"}>
        {error && (
          <Alert className={"mb-4"} status={"error"}>
            {error.message}
          </Alert>
        )}
        {categories?.length ? (
          <CategoryList categories={categories} />
        ) : categories?.length === 0 ? (
          <div className={"flex h-full flex-col items-center justify-center"}>
            <Icon height={128} icon={sadIcon} />
            <p className={"mt-4 text-2xl"}>{t("content.noCategory")}</p>
          </div>
        ) : null}
      </div>
    </>
  );
};

type SSRProps = {
  fallback: {
    [id: string]: CategoryDTO[];
  };
};

const CategoriesPageWithSWR: NextPage<SSRProps> = ({ fallback }) => {
  return (
    <SWRConfig value={{ fallback }}>
      <CategoriesPage />
    </SWRConfig>
  );
};

export async function getServerSideProps() {
  const { categories } = await getCategories();

  return {
    props: {
      fallback: {
        "/categories": categories ?? null,
      },
    } as SSRProps,
  };
}

export default CategoriesPageWithSWR;
