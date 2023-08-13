import { LanguageString } from "./i18n";

export type Education = {
  title: LanguageString;
  specialty?: LanguageString;
  school: string;
  location: string;
  startDate: string;
  endDate: string;
};
