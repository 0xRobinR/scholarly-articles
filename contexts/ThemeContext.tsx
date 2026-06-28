"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

export type Theme = "terminal" | "ide" | "hacker" | "crt";

interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "terminal",
  setTheme: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("terminal");

  useEffect(() => {
    const stored = localStorage.getItem("coder-theme") as Theme | null;
    if (stored && ["terminal", "ide", "hacker", "crt"].includes(stored)) {
      setThemeState(stored);
      document.documentElement.className = `theme-${stored}`;
    } else {
      document.documentElement.className = "theme-terminal";
    }
  }, []);

  const setTheme = (t: Theme) => {
    setThemeState(t);
    document.documentElement.className = `theme-${t}`;
    localStorage.setItem("coder-theme", t);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
