import type { FC } from "react";

import { Icon } from "@iconify-icon/react";
import {
  Button,
  Menu,
  MenuContent,
  MenuItem,
  MenuPositioner,
  MenuTrigger,
} from "@sandwich-ui/react";
import { type RecipeVariantProps, sva } from "@sandwich-ui/styled-system/css";

import { useTheme } from "../../lib/theme/context";
import { m } from "../../paraglide/messages";

const themeSwitcherRecipe = sva({
  base: {
    moonIcon: {
      _dark: {
        transform: "rotate(0deg) scale(100%)",
      },
      position: "absolute",
      transform: "rotate(-90deg) scale(0)",
      transition: "all",
    },
    srOnly: {
      srOnly: true,
    },
    sunIcon: {
      _dark: {
        transform: "rotate(-90deg) scale(0)",
      },
      transform: "rotate(0deg) scale(100%)",
      transition: "all",
    },
    triggerButton: {
      alignItems: "center",
      justifyContent: "center",
      p: 0,
      position: "relative",
    },
  },
  defaultVariants: {
    size: "md",
  },
  slots: ["triggerButton", "sunIcon", "moonIcon", "srOnly"],
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

export type ThemeSwitcherProps = RecipeVariantProps<typeof themeSwitcherRecipe>;

export const ThemeSwitcher: FC<ThemeSwitcherProps> = (props) => {
  const { setTheme } = useTheme();
  const classes = themeSwitcherRecipe(props);

  return (
    <Menu>
      <MenuTrigger asChild>
        <Button
          className={classes.triggerButton}
          color={"secondary"}
          size={"lg"}
          variant={"outlined"}
        >
          <Icon
            className={classes.sunIcon}
            height={"1.2rem"}
            icon={"ph:sun"}
            width={"1.2rem"}
          />
          <Icon
            className={classes.moonIcon}
            height={"1.2rem"}
            icon={"ph:moon"}
            width={"1.2rem"}
          />
          <span className={classes.srOnly}>{m["common.theme.switch"]()}</span>
        </Button>
      </MenuTrigger>
      <MenuPositioner>
        <MenuContent>
          <MenuItem onClick={() => setTheme("light")} value={"light"}>
            {m["common.theme.light"]()}
          </MenuItem>
          <MenuItem onClick={() => setTheme("dark")} value={"dark"}>
            {m["common.theme.dark"]()}
          </MenuItem>
          <MenuItem onClick={() => setTheme("")} value={"system"}>
            {m["common.theme.system"]()}
          </MenuItem>
        </MenuContent>
      </MenuPositioner>
    </Menu>
  );
};
