"use client";

import styles from "../../styles/modules/About.module.scss";
import Skills from "../../components/Skills";

const info = [
  { key: "name", value: "robin rajput" },
  { key: "role", value: "core builder" },
  { key: "reach", value: "explain.this@robinrajput.com", href: "mailto:explain.this@robinrajput.com" },
  { key: "location", value: "milky way galaxy" },
  { key: "active_since", value: "2017" },
  { key: "focus", value: "blockchain, cryptography, decentralized systems" },
];

export default function About() {
  return (
    <section className={styles.about}>
      <div className="container">
        <div className={styles.terminal}>
          <div className={styles.titleBar}>
            <span className={`${styles.dot} ${styles.red}`} />
            <span className={`${styles.dot} ${styles.yellow}`} />
            <span className={`${styles.dot} ${styles.green}`} />
            <span className={styles.titleText}>jq &apos;.&apos; ~/identity.json</span>
          </div>
          <div className={styles.body}>
            <div className={styles.comment}>&#47;&#47; who is this person?</div>
            <div className={styles.bracket}>&#123;</div>
            {info.map((item, i) => (
              <div className={styles.field} key={item.key}>
                <span className={styles.key}>&quot;{item.key}&quot;</span>
                <span className={styles.colon}>:</span>
                {item.href ? (
                  <a href={item.href} className={styles.value}>
                    &quot;{item.value}&quot;
                  </a>
                ) : (
                  <span className={styles.value}>&quot;{item.value}&quot;</span>
                )}
                {i < info.length - 1 && <span className={styles.comma}>,</span>}
              </div>
            ))}
            <div className={styles.bracket}>&#125;</div>
          </div>
        </div>

        <div className={styles.bio}>
          <div className={styles.bioHeader}>
            <span className={styles.prompt}>$</span> grep -A 99 &apos;## bio&apos; README.md | tail -n +2
          </div>
          <div className={styles.bioContent}>
            <p>
              interested and curious about the fundamental workings of anything related to computers.
              there are many problems to be solved — working on it since 2017, created and managed many patches.
            </p>
            <p>
              thanks to blockchain. <span className={styles.highlight}>#WAGMI</span>
            </p>
          </div>
        </div>

        <Skills />
      </div>
    </section>
  );
}
