import { Icon } from "@iconify-icon/react";
import { css } from "@sandwich-ui/core/css";
import {
  Button,
  Menu,
  MenuContent,
  MenuItem,
  MenuTrigger,
} from "@sandwich-ui/react";
import type { FC } from "react";
import { useTranslation } from "react-i18next";

import { useTheme } from "../../lib/theme/useTheme";

export const ThemeSwitcher: FC = () => {
  const { t } = useTranslation("common");
  const { setTheme } = useTheme();

  return (
    <Menu>
      <MenuTrigger asChild>
        <Button
          className={css({
            width: "10",
            height: "10",
            alignItems: "center",
            justifyContent: "center",
            p: 0,
          })}
          size={"md"}
          variant={"outlined"}
        >
          <Icon
            className={css({
              transform: "rotate(0deg) scale(100%)",
              transition: "all",
              _dark: {
                transform: "rotate(-90deg) scale(0)",
              },
            })}
            height={"1.2rem"}
            icon={"ph:sun"}
            width={"1.2rem"}
          />
          <Icon
            className={css({
              position: "absolute",
              transform: "rotate(-90deg) scale(0)",
              transition: "all",
              _dark: {
                transform: "rotate(0deg) scale(100%)",
              },
            })}
            height={"1.2rem"}
            icon={"ph:moon"}
            width={"1.2rem"}
          />
          <span className={css({ srOnly: true })}>Switch theme</span>
        </Button>
      </MenuTrigger>
      <MenuContent>
        <MenuItem onClick={() => setTheme("light")} value={"light"}>
          {t("theme.light")}
        </MenuItem>
        <MenuItem onClick={() => setTheme("dark")} value={"dark"}>
          {t("theme.dark")}
        </MenuItem>
        <MenuItem onClick={() => setTheme("")} value={"system"}>
          {t("theme.system")}
        </MenuItem>
      </MenuContent>
    </Menu>
  );
};
