"use client";

import type { ReactNode } from "react";
import styles from "../styles/modules/App.module.scss";
import { ThemeProvider } from "../contexts/ThemeContext";
import FloatingNav from "../components/FloatingNav";
import Preloader from "../components/Preloader";
import DarkLightToggle from "../components/DarkLightToggle";

export default function ClientShell({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <DarkLightToggle />
      <FloatingNav />
      <div className={styles.main}>
        <Preloader />
        {children}
      </div>
    </ThemeProvider>
  );
}
