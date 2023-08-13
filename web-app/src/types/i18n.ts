import { languages } from "../constants/i18n";

export type LanguageType = (typeof languages)[number];

export type LanguageString = {
  [key in LanguageType]: string;
};
