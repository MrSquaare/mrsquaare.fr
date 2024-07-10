import { LanguageString } from "./i18n";
import { Technology } from "./technology";

export enum ExperienceType {
  INTERNSHIP,
  APPRENTICESHIP,
  CONTRACT,
}

export type Experience = {
  title: LanguageString;
  type: ExperienceType;
  company: LanguageString;
  location: LanguageString;
  startDate: string;
  endDate: string | null;
  missions: LanguageString[];
  technologies: Technology[];
};
