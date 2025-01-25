import type { LanguageString } from "./i18n";

export type Education = {
  title: LanguageString;
  specialty?: LanguageString;
  school: LanguageString;
  location: LanguageString;
  startDate: string;
  endDate: string;
};
