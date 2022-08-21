import arrowUpIcon from "@iconify/icons-fa-solid/arrow-up";
import { Icon } from "@iconify/react";
import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, useCallback, useEffect, useState } from "react";
import { Button, Tooltip } from "react-daisyui";
import { useTranslation } from "react-i18next";

export const ScrollToTop: FC = () => {
  const { locale } = useRouter();
  const { t } = useTranslation("common");
  const [isVisible, setIsVisible] = useState(false);

  const onScroll = useCallback(() => {
    if (window.scrollY > 256) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [onScroll]);

  return (
    <div
      className={classNames("fixed right-4 bottom-4 transition-opacity", {
        "opacity-100": isVisible,
        "opacity-0": !isVisible,
      })}
    >
      <Tooltip
        className={"tooltip-left"}
        message={t("scrollToTop.tooltip", { lng: locale })}
      >
        <Link href={"#"}>
          <Button onClick={scrollToTop}>
            <Icon height={20} icon={arrowUpIcon} />
          </Button>
        </Link>
      </Tooltip>
    </div>
  );
};
