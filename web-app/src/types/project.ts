import { LanguageString } from "./i18n";
import { Link } from "./link";
import { Technology } from "./technology";

export type Project = {
  title: LanguageString;
  description: LanguageString;
  inDevelopment?: boolean;
  technologies: Technology[];
  links: Link[];
};
