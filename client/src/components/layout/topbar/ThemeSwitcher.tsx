import moonIcon from "@iconify/icons-twemoji/new-moon";
import sunIcon from "@iconify/icons-twemoji/sun";
import { Icon } from "@iconify/react";
import { useCallback, useEffect } from "react";
import { Toggle, useTheme } from "react-daisyui";

import { getPreferredTheme, setPreferredTheme } from "../../../utilities";

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const preferredTheme = getPreferredTheme();

    setTheme(preferredTheme);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChangeTheme = useCallback(() => {
    const newTheme = theme === "light" ? "dark" : "light";

    setTheme(newTheme);
    setPreferredTheme(newTheme);
  }, [setTheme, theme]);

  return (
    <div className={"flex items-center"}>
      <Icon className={"mr-1"} height={20} icon={sunIcon} />
      <Toggle
        checked={theme === "dark"}
        className={"border-neutral bg-neutral"}
        onChange={() => handleChangeTheme()}
      />
      <Icon className={"ml-1"} height={20} icon={moonIcon} />
    </div>
  );
};
