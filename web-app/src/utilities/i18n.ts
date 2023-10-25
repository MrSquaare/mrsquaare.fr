import { LanguageString, LanguageType } from "../types/i18n";

export const getLanguageString = (
  string: LanguageString,
  language: LanguageType,
) => {
  if (typeof string === "string") {
    return string;
  }

  return string[language];
};
