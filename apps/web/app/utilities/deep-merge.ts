export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

export const deepMerge = <T extends object>(
  defaults: T,
  overrides?: DeepPartial<T>,
): T => {
  if (!overrides) {
    return defaults;
  }

  const result = { ...defaults, ...overrides } as Record<string, unknown>;

  for (const key of Object.keys(defaults as object)) {
    const defaultVal = (defaults as Record<string, unknown>)[key];
    const overrideVal = (overrides as Record<string, unknown>)[key];

    if (
      defaultVal !== null &&
      typeof defaultVal === "object" &&
      !Array.isArray(defaultVal) &&
      overrideVal !== undefined &&
      overrideVal !== null &&
      typeof overrideVal === "object" &&
      !Array.isArray(overrideVal)
    ) {
      result[key] = { ...(defaultVal as object), ...(overrideVal as object) };
    }
  }

  return result as T;
};
