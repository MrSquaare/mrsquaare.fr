import { languages } from "../constants/i18n";

export type LanguageType = (typeof languages)[number];

export type LanguageString =
  | string
  | {
      [key in LanguageType]: string;
    };
