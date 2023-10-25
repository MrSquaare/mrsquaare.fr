import { Metadata } from "next";
import { LayoutProps, MetadataProps } from "next/navigation";
import { FC } from "react";

import { getTranslation } from "../../../i18n/server";

export async function generateMetadata({
  params: { lng },
}: MetadataProps): Promise<Metadata> {
  const { t } = await getTranslation(lng, "cv");

  return {
    title: `${t("page.title")} - MrSquaare`,
  };
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return children;
};

export default Layout;
