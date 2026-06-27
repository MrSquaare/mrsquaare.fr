import {
  type FC,
  type PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useSyncExternalStore,
} from "react";

import {
  localStorageStore,
  mediaStore,
  setStoredTheme,
  type ThemeConfig,
  ThemeContext,
} from "./context";

export type ThemeProviderProps = PropsWithChildren<{
  config: ThemeConfig;
}>;

export const ThemeProvider: FC<ThemeProviderProps> = ({ children, config }) => {
  const theme = useSyncExternalStore(
    localStorageStore.subscribe,
    localStorageStore.getSnapshot,
    localStorageStore.getServerSnapshot,
  );
  const prefersDark = useSyncExternalStore(
    mediaStore.subscribe,
    mediaStore.getSnapshot,
    mediaStore.getServerSnapshot,
  );

  const preferredTheme = prefersDark ? config.defaultDark : config.defaultLight;
  const resolvedTheme = theme || preferredTheme;

  const setTheme = useCallback((newTheme: string) => {
    setStoredTheme(newTheme);
  }, []);

  useEffect(() => {
    const classList = document.documentElement.classList;

    config.themes.forEach((t) => classList.remove(t));

    if (resolvedTheme) {
      classList.add(resolvedTheme);
    }
  }, [resolvedTheme, config.themes]);

  const value = useMemo(
    () => ({
      config,
      preferredTheme,
      resolvedTheme,
      setTheme,
      theme,
    }),
    [config, theme, preferredTheme, resolvedTheme, setTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
