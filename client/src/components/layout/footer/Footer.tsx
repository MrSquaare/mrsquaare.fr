import { FC } from "react";

import { WEBSITE_COPYRIGHT } from "../../../constants";

export const Footer: FC = () => {
  const year = new Date().getFullYear();

  return (
    <div className={"bg-base-200"}>
      <div className={"container mx-auto"}>
        <div className={"p-4"}>
          <span>
            &copy; {year} {WEBSITE_COPYRIGHT}
          </span>
        </div>
      </div>
    </div>
  );
};
