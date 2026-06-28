"use client";

import { useState, useEffect, useCallback } from "react";
import { FaMoon, FaLightbulb, FaGavel, FaSkull } from "react-icons/fa";
import styles from "../styles/modules/DarkLightToggle.module.scss";

type Phase = "dark" | "light" | "smashing" | "shattered";

export default function DarkLightToggle() {
  const [phase, setPhase] = useState<Phase>("dark");

  const triggerLight = useCallback(() => {
    if (phase !== "dark") return;
    document.documentElement.classList.add("light-mode");
    setPhase("light");
  }, [phase]);

  useEffect(() => {
    if (phase === "light") {
      const t = setTimeout(() => setPhase("smashing"), 1500);
      return () => clearTimeout(t);
    }
    if (phase === "smashing") {
      const t = setTimeout(() => {
        document.documentElement.classList.remove("light-mode");
        setPhase("shattered");
      }, 600);
      return () => clearTimeout(t);
    }
    if (phase === "shattered") {
      const t = setTimeout(() => setPhase("dark"), 1200);
      return () => clearTimeout(t);
    }
  }, [phase]);

  const icon = () => {
    if (phase === "shattered") return <FaSkull />;
    if (phase === "light" || phase === "smashing") return <FaLightbulb />;
    return <FaMoon />;
  };

  return (
    <div className={styles.toggle}>
      <button
        className={styles.btn}
        onClick={triggerLight}
        disabled={phase !== "dark"}
      >
        <span className={`${styles.bulb} ${phase === "light" || phase === "smashing" ? styles.lit : ""} ${phase === "shattered" ? styles.dead : ""}`}>
          {icon()}
        </span>
      </button>

      {phase === "smashing" && (
        <span className={styles.hammer}>
          <FaGavel />
        </span>
      )}

      {phase === "shattered" && (
        <div className={styles.sparks}>
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className={styles.spark} style={{ ["--i" as string]: i }} />
          ))}
        </div>
      )}

      {phase === "shattered" && (
        <span className={styles.message}>nice try.</span>
      )}
    </div>
  );
}
