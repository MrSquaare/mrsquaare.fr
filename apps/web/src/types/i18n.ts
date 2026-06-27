import type { languages } from "../constants/i18n";

export type LanguageString =
  | string
  | {
      [key in LanguageType]: string;
    };

export type LanguageType = (typeof languages)[number];
