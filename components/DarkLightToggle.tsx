"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { FaMoon, FaLightbulb, FaSkull, FaGavel, FaCrosshairs } from "react-icons/fa";
import styles from "../styles/modules/DarkLightToggle.module.scss";

type Phase = "dark" | "light" | "attack" | "hit" | "shattered";
type Method = "arrow" | "hammer" | "lightning" | "sniper";

const methods: Method[] = ["arrow", "hammer", "lightning", "sniper"];
const messages = [
  "nice try.",
  "nope.",
  "not happening.",
  "darkness prevails.",
];

export default function DarkLightToggle() {
  const [phase, setPhase] = useState<Phase>("dark");
  const [method, setMethod] = useState<Method>("arrow");
  const [msg, setMsg] = useState("nice try.");
  const usedRef = useRef<Method[]>([]);

  const pickMethod = useCallback(() => {
    const available = methods.filter((m) => !usedRef.current.includes(m));
    const pool = available.length > 0 ? available : methods;
    if (available.length === 0) usedRef.current = [];
    const pick = pool[Math.floor(Math.random() * pool.length)];
    usedRef.current.push(pick);
    return pick;
  }, []);

  const triggerLight = useCallback(() => {
    if (phase !== "dark") return;
    const m = pickMethod();
    setMethod(m);
    setMsg(messages[methods.indexOf(m)]);
    document.documentElement.classList.add("light-mode");
    setPhase("light");
  }, [phase, pickMethod]);

  useEffect(() => {
    const timings: Record<Method, { attack: number; hit: number; shatter: number }> = {
      arrow: { attack: 1200, hit: 1600, shatter: 1500 },
      hammer: { attack: 1200, hit: 600, shatter: 1200 },
      lightning: { attack: 1000, hit: 400, shatter: 1300 },
      sniper: { attack: 1200, hit: 800, shatter: 1400 },
    };
    const t = timings[method];

    if (phase === "light") {
      const timer = setTimeout(() => setPhase("attack"), t.attack);
      return () => clearTimeout(timer);
    }
    if (phase === "attack") {
      const timer = setTimeout(() => {
        setPhase("hit");
      }, t.hit);
      return () => clearTimeout(timer);
    }
    if (phase === "hit") {
      document.documentElement.classList.remove("light-mode");
      const timer = setTimeout(() => setPhase("shattered"), 100);
      return () => clearTimeout(timer);
    }
    if (phase === "shattered") {
      const timer = setTimeout(() => setPhase("dark"), t.shatter);
      return () => clearTimeout(timer);
    }
  }, [phase, method]);

  const icon = () => {
    if (phase === "shattered") return <FaSkull />;
    if (phase !== "dark") return <FaLightbulb />;
    return <FaMoon />;
  };

  return (
    <div className={styles.toggle}>
      <button
        className={styles.btn}
        onClick={triggerLight}
        disabled={phase !== "dark"}
      >
        <span className={`${styles.bulb} ${phase !== "dark" && phase !== "shattered" ? styles.lit : ""} ${phase === "shattered" ? styles.dead : ""}`}>
          {icon()}
        </span>
      </button>

      {method === "arrow" && (phase === "attack" || phase === "hit") && (
        <div className={styles.scene}>
          <svg
            className={`${styles.bowSvg} ${phase === "hit" ? styles.released : ""}`}
            viewBox="0 0 80 120"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M20 10 Q60 60 20 110" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            <line x1="20" y1="10" x2="20" y2="110" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          <svg
            className={`${styles.arrowSvg} ${phase === "hit" ? styles.fly : ""}`}
            viewBox="0 0 200 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line x1="30" y1="10" x2="170" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <polygon points="170,4 185,10 170,16" fill="currentColor" />
            <line x1="30" y1="10" x2="18" y2="4" stroke="currentColor" strokeWidth="1.5" />
            <line x1="30" y1="10" x2="18" y2="16" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </div>
      )}

      {method === "hammer" && (phase === "attack" || phase === "hit") && (
        <span className={`${styles.hammer} ${phase === "hit" ? styles.hammerHit : ""}`}>
          <FaGavel />
        </span>
      )}

      {method === "lightning" && (phase === "attack" || phase === "hit") && (
        <svg
          className={`${styles.lightning} ${phase === "hit" ? styles.strike : ""}`}
          viewBox="0 0 60 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polyline
            points="35,0 20,80 35,85 15,160 30,165 10,200"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}

      {method === "sniper" && (phase === "attack" || phase === "hit") && (
        <>
          <div className={`${styles.crosshair} ${phase === "hit" ? styles.locked : ""}`}>
            <FaCrosshairs />
          </div>
          {phase === "hit" && <div className={styles.muzzleFlash} />}
        </>
      )}

      {phase === "shattered" && (
        <div className={styles.sparks}>
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className={styles.spark} style={{ ["--i" as string]: i }} />
          ))}
        </div>
      )}

      {phase === "shattered" && (
        <span className={styles.message}>{msg}</span>
      )}
    </div>
  );
}
