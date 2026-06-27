import { enGB as dateFnsEN, fr as dateFnsFR } from "date-fns/locale";

export const defaultLanguage = "en" as const;
export const languages = [defaultLanguage, "fr"] as const;

export const dateFnsLocales = {
  [languages[0]]: dateFnsEN,
  [languages[1]]: dateFnsFR,
} as const;
