"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaGithub, FaArrowUp, FaBug, FaArrowLeft, FaCopy, FaCheck } from "react-icons/fa";
import moment from "moment";
import { articleFile, raiseIssue } from "../../../config";
import styles from "../../../styles/modules/Articles.module.scss";

interface ArticleViewProps {
  content: string;
  metadata: Record<string, string | number | null>;
}

export default function ArticleView({ content, metadata }: ArticleViewProps) {
  const router = useRouter();
  const [copied, setCopied] = useState(false);

  const date = new Date(metadata.date as string);
  const formattedDate = moment(date).format("YYYY-MM-DD");
  const tags = (metadata.tags as string)?.split(",").map((t) => t.trim()).filter(Boolean) || [];

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className={styles.page}>
      <div className={styles.container}>
        <div className={styles.terminal}>
          <div className={styles.titleBar}>
            <span className={`${styles.dot} ${styles.red}`} />
            <span className={`${styles.dot} ${styles.yellow}`} />
            <span className={`${styles.dot} ${styles.green}`} />
            <span className={styles.titleBarText}>{metadata.file as string}</span>
          </div>

          <div className={styles.toolbar}>
            <button className={styles.toolBtn} onClick={() => router.push("/scholarly-articles")}>
              <FaArrowLeft /> <span>cd ..</span>
            </button>
            <div className={styles.toolbarRight}>
              <button className={styles.toolBtn} onClick={handleCopyLink}>
                {copied ? <FaCheck /> : <FaCopy />}
                <span>{copied ? "copied" : "share"}</span>
              </button>
              <a className={styles.toolBtn} href={`${articleFile}${metadata.file}`} target="_blank">
                <FaGithub /> <span>source</span>
              </a>
              <a className={styles.toolBtn} href={`${raiseIssue}?title=Issue in ${metadata.file}`} target="_blank">
                <FaBug /> <span>issue</span>
              </a>
            </div>
          </div>

          <div className={styles.frontmatter}>
            <div className={styles.fmLine}>
              <span className={styles.fmDelim}>---</span>
            </div>
            <div className={styles.fmLine}>
              <span className={styles.fmKey}>title:</span>
              <span className={styles.fmVal}>{metadata.title as string}</span>
            </div>
            <div className={styles.fmLine}>
              <span className={styles.fmKey}>author:</span>
              <span className={styles.fmVal}>{metadata.author as string}</span>
            </div>
            <div className={styles.fmLine}>
              <span className={styles.fmKey}>date:</span>
              <span className={styles.fmVal}>{formattedDate}</span>
            </div>
            <div className={styles.fmLine}>
              <span className={styles.fmKey}>index:</span>
              <span className={styles.fmNumber}>{metadata.index as number}</span>
            </div>
            {metadata.oneLiner && (
              <div className={styles.fmLine}>
                <span className={styles.fmKey}>one_liner:</span>
                <span className={styles.fmVal}>{metadata.oneLiner as string}</span>
              </div>
            )}
            <div className={styles.fmLine}>
              <span className={styles.fmKey}>tags:</span>
              <span className={styles.fmTags}>
                [{tags.map((t, i) => (
                  <span key={t}>
                    <span className={styles.fmVal}>{t}</span>
                    {i < tags.length - 1 && <span className={styles.fmComma}>, </span>}
                  </span>
                ))}]
              </span>
            </div>
            <div className={styles.fmLine}>
              <span className={styles.fmDelim}>---</span>
            </div>
          </div>

          <div className={styles.body}>
            <div className={styles.markdown} dangerouslySetInnerHTML={{ __html: content }} />
          </div>

          <div className={styles.footer}>
            <span className={styles.footerInfo}>
              EOF — {metadata.file as string}
            </span>
            <button className={styles.toolBtn} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
              <FaArrowUp /> <span>top</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
