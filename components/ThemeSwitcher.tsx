"use client";

import { useTheme, type Theme } from "../contexts/ThemeContext";
import styles from "../styles/modules/ThemeSwitcher.module.scss";

const themes: { id: Theme; label: string; color: string }[] = [
  { id: "terminal", label: "> terminal", color: "#00ff41" },
  { id: "ide", label: "{ } editor", color: "#569cd6" },
  { id: "hacker", label: "// hacker", color: "#00ffd5" },
  { id: "crt", label: "█ crt", color: "#33ff33" },
];

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <div className={styles.switcher}>
      {themes.map((t) => (
        <button
          key={t.id}
          className={`${styles.option} ${theme === t.id ? styles.active : ""}`}
          onClick={() => setTheme(t.id)}
        >
          <span className={styles.swatch} style={{ backgroundColor: t.color }} />
          {t.label}
        </button>
      ))}
    </div>
  );
}
