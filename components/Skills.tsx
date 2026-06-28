"use client";

import styles from "../styles/modules/Skills.module.scss";

const skills = [
  { percent: 100, name: "dapp browser" },
  { percent: 45, name: "blockchain" },
  { percent: 23, name: "code lang." },
  { percent: 1.1, name: "artificial blockchain" },
];

const RADIUS = 54;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function Skills() {
  return (
    <div className={styles.skills}>
      <div className={styles.header}>
        <span className={styles.prompt}>$</span> htop --sort=PERCENT_CPU --filter=builds
      </div>
      <div className={styles.grid}>
        {skills.map((skill) => {
          const offset = CIRCUMFERENCE - (skill.percent / 100) * CIRCUMFERENCE;
          return (
            <div className={styles.item} key={skill.name}>
              <div className={styles.ring}>
                <svg viewBox="0 0 120 120" className={styles.svg}>
                  <circle
                    cx="60"
                    cy="60"
                    r={RADIUS}
                    className={styles.trackCircle}
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r={RADIUS}
                    className={styles.progressCircle}
                    strokeDasharray={CIRCUMFERENCE}
                    strokeDashoffset={offset}
                  />
                </svg>
                <div className={styles.label}>
                  <span className={styles.pct}>{skill.percent}%</span>
                </div>
              </div>
              <span className={styles.name}>{skill.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
