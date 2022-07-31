import enFlagIcon from "@iconify/icons-twemoji/flag-for-flag-united-kingdom";
import frFlagIcon from "@iconify/icons-twemoji/flag-for-france";
import { Icon } from "@iconify/react";
import { useCallback, useEffect } from "react";
import { Dropdown } from "react-daisyui";

import { useLanguage } from "../../../hooks";
import { Language } from "../../../types";
import { getPreferredLanguage, setPreferredLanguage } from "../../../utilities";

const languages: Language[] = [
  {
    id: "fr",
    name: "Français",
    icon: <Icon height={20} icon={frFlagIcon} />,
  },
  {
    id: "en",
    name: "English",
    icon: <Icon height={20} icon={enFlagIcon} />,
  },
];

export const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage(languages);

  useEffect(() => {
    const preferredLanguage = getPreferredLanguage();

    setLanguage(preferredLanguage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChangeTheme = useCallback(
    (newLanguageId: string) => {
      setLanguage(newLanguageId);
      setPreferredLanguage(newLanguageId);
    },
    [setLanguage]
  );

  return (
    <Dropdown vertical={"end"}>
      <Dropdown.Toggle color={"ghost"} size={"sm"}>
        {language?.icon}
      </Dropdown.Toggle>
      <Dropdown.Menu className={"w-52"}>
        {languages.map((item) =>
          item.id !== language?.id ? (
            <Dropdown.Item
              key={item.id}
              onClick={() => handleChangeTheme(item.id)}
            >
              {item.icon} {item.name}
            </Dropdown.Item>
          ) : null
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
};
