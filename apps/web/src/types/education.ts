import type { LanguageString } from "./i18n";

export type Education = {
  endDate: string;
  location: LanguageString;
  school: LanguageString;
  specialty?: LanguageString;
  startDate: string;
  title: LanguageString;
};
