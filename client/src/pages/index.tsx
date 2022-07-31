import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

import { HomeContent } from "../components/home";
import { WEBSITE_TITLE } from "../constants";

const Home: NextPage = () => {
  const { locale } = useRouter();
  const { t } = useTranslation("home");

  return (
    <>
      <Head>
        <title>
          {`${t("page.title", { lng: locale })} - ${WEBSITE_TITLE}`}
        </title>
      </Head>
      <div className={"container mx-auto h-full p-4"}>
        <HomeContent />
      </div>
    </>
  );
};

export default Home;
