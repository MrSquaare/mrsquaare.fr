import "../../styles/globals.css";

import type { Metadata } from "next";
import { LayoutProps } from "next/navigation";
import { FC } from "react";

import { ThemeProvider } from "../../components/theme-provider";
import { TooltipProvider } from "../../components/ui/tooltip";
import { languages } from "../../constants/i18n";

export const metadata: Metadata = {
  title: "MrSquaare",
  description: "MrSquaare's personal website",
  icons: {
    icon: "/favicon.svg",
  },
};

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

const RootLayout: FC<LayoutProps> = ({ children }) => {
  return (
    <html lang={"en"}>
      <body>
        <ThemeProvider attribute={"class"} defaultTheme={"system"} enableSystem>
          <TooltipProvider>{children}</TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
