import { css } from "@sandwich-ui/core/css";
import {
  Button,
  Menu,
  MenuContent,
  MenuItem,
  MenuTrigger,
} from "@sandwich-ui/react";
import type { FC } from "react";

import { useI18n } from "../../lib/i18n/useI18n";

export const LanguageSwitcher: FC = () => {
  const { language, setLanguage } = useI18n();

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
          {language.toUpperCase()}
          <span className={css({ srOnly: true })}>Switch language</span>
        </Button>
      </MenuTrigger>
      <MenuContent>
        <MenuItem onClick={() => setLanguage("en")} value={"en"}>
          English
        </MenuItem>
        <MenuItem onClick={() => setLanguage("fr")} value={"fr"}>
          Français
        </MenuItem>
      </MenuContent>
    </Menu>
  );
};
