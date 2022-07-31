import "../styles/app.scss";

import { AppProps } from "next/app";
import Head from "next/head";
import { FC } from "react";
import { I18nextProvider } from "react-i18next";

import { Layout } from "../components/layout";
import { WEBSITE_DESCRIPTION, WEBSITE_TITLE } from "../constants";
import { i18n } from "../i18n";

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <meta content={WEBSITE_TITLE} name={"title"} />
        <meta content={WEBSITE_DESCRIPTION} name={"description"} />
        <meta
          content={"initial-scale=1, width=device-width"}
          name={"viewport"}
        />
        <meta charSet={"utf-8"} />

        <link href={"/favicon.svg"} rel={"icon"} />
      </Head>
      <I18nextProvider i18n={i18n}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </I18nextProvider>
    </>
  );
};

export default MyApp;
