import { FC } from "react";
import { Theme } from "react-daisyui";

import { Footer } from "./footer";
import { TopBar } from "./topbar";

type Props = {
  children?: React.ReactNode;
};

export const Layout: FC<Props> = ({ children }) => {
  return (
    <Theme className={"flex grow flex-col"} dataTheme={"dark"}>
      <header className={"sticky top-0 z-10"}>
        <TopBar />
      </header>
      <main className={"flex grow flex-col"}>{children}</main>
      <footer>
        <Footer />
      </footer>
    </Theme>
  );
};
