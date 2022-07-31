import { DEFAULT_LANGUAGE } from "../constants";

const LANGUAGE_STORE_KEY = "language";

export const getPreferredLanguage = (): string => {
  const language = localStorage.getItem(LANGUAGE_STORE_KEY);

  if (language) {
    return language;
  }

  return DEFAULT_LANGUAGE;
};

export const setPreferredLanguage = (language: string): void => {
  localStorage.setItem(LANGUAGE_STORE_KEY, language);
};
