import { enGB as dateFnsEN, fr as dateFnsFR } from "date-fns/locale";

export const fallbackLng = "en" as const;
export const languages = [fallbackLng, "fr"] as const;

export const dateFnsLocales = {
  [languages[0]]: dateFnsEN,
  [languages[1]]: dateFnsFR,
} as const;
