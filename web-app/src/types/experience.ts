import { LanguageString } from "./i18n";
import { Technology } from "./technology";

export enum ExperienceType {
  INTERNSHIP,
  APPRENTICESHIP,
}

export type Experience = {
  title: LanguageString;
  type: ExperienceType;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  missions: LanguageString[];
  technologies: Technology[];
};
