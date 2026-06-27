import type { LanguageString } from "./i18n";
import type { Technology } from "./technology";

export enum ExperienceType {
  INTERNSHIP,
  APPRENTICESHIP,
  CONTRACT,
}

export type Experience = {
  company: LanguageString;
  endDate: null | string;
  location: LanguageString;
  missions: LanguageString[];
  startDate: string;
  technologies: Technology[];
  title: LanguageString;
  type: ExperienceType;
};
