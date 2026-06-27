import type { FC } from "react";

import {
  Button,
  Menu,
  MenuContent,
  MenuItem,
  MenuPositioner,
  MenuTrigger,
} from "@sandwich-ui/react";
import { type RecipeVariantProps, sva } from "@sandwich-ui/styled-system/css";

import { getLocale, setLocale } from "../../paraglide/runtime";

const languageSwitcherRecipe = sva({
  base: {
    srOnly: {
      srOnly: true,
    },
    triggerButton: {
      alignItems: "center",
      justifyContent: "center",
      p: 0,
    },
  },
  defaultVariants: {
    size: "md",
  },
  slots: ["triggerButton", "srOnly"],
  variants: {
    size: {
      lg: {
        triggerButton: {
          height: 12,
          width: 12,
        },
      },
      md: {
        triggerButton: {
          height: 10,
          width: 10,
        },
      },
    },
  },
});

export type LanguageSwitcherProps = RecipeVariantProps<
  typeof languageSwitcherRecipe
>;

export const LanguageSwitcher: FC<LanguageSwitcherProps> = (props) => {
  const language = getLocale();
  const classes = languageSwitcherRecipe(props);

  return (
    <Menu>
      <MenuTrigger asChild>
        <Button
          className={classes.triggerButton}
          color={"secondary"}
          size={"lg"}
          variant={"outlined"}
        >
          {language.toUpperCase()}
          <span className={classes.srOnly}>Switch language</span>
        </Button>
      </MenuTrigger>
      <MenuPositioner>
        <MenuContent>
          <MenuItem onClick={() => setLocale("en")} value={"en"}>
            English
          </MenuItem>
          <MenuItem onClick={() => setLocale("fr")} value={"fr"}>
            Français
          </MenuItem>
        </MenuContent>
      </MenuPositioner>
    </Menu>
  );
};
