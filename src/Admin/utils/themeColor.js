/** Reads a theme token at runtime (e.g. themeColor("primary")) so no hex is hardcoded in components. */
export const themeColor = (name, fallback = "#000000") =>
  (typeof window !== "undefined" &&
    getComputedStyle(document.documentElement).getPropertyValue(`--c-${name}`).trim()) || fallback;