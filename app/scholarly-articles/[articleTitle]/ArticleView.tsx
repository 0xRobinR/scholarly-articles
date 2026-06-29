"use client";

import { useState } from "react";
import Link from "next/link";
import { FaGithub, FaArrowLeft, FaCopy, FaCheck, FaBug } from "react-icons/fa";
import moment from "moment";
import { articleFile, raiseIssue } from "../../../config";
import styles from "../../../styles/modules/Articles.module.scss";

interface ArticleViewProps {
  content: string;
  metadata: Record<string, string | number | null>;
}

export default function ArticleView({ content, metadata }: ArticleViewProps) {
  const [copied, setCopied] = useState(false);

  const date = new Date(metadata.date as string);
  const formattedDate = moment(date).format("MMM D, YYYY");
  const tags = (metadata.tags as string)?.split(",").map((t) => t.trim()).filter(Boolean) || [];

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <article className={styles.article}>
      <nav className={styles.nav}>
        <Link href="/" className={styles.back}>
          <FaArrowLeft /> all articles
        </Link>
        <div className={styles.actions}>
          <button className={styles.actionBtn} onClick={handleCopy}>
            {copied ? <FaCheck /> : <FaCopy />}
          </button>
          <a className={styles.actionBtn} href={`${articleFile}${metadata.file}`} target="_blank">
            <FaGithub />
          </a>
          <a className={styles.actionBtn} href={`${raiseIssue}?title=Issue in ${metadata.file}`} target="_blank">
            <FaBug />
          </a>
        </div>
      </nav>

      <header className={styles.header}>
        <h1 className={styles.title}>{metadata.title as string}</h1>
        <div className={styles.meta}>
          <span>{metadata.author as string}</span>
          <span className={styles.dot}>·</span>
          <span>{formattedDate}</span>
          {tags.map((tag) => (
            <span key={tag} className={styles.tag}>{tag}</span>
          ))}
        </div>
      </header>

      <div className={styles.content} dangerouslySetInnerHTML={{ __html: content }} />

      <footer className={styles.footer}>
        <a className={styles.footerLink} href={`${articleFile}${metadata.file}`} target="_blank">
          git link
        </a>
        <button className={styles.footerLink} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          top
        </button>
        <a className={styles.footerLink} href={`${raiseIssue}?title=Issue in ${metadata.file}`} target="_blank">
          issue?
        </a>
      </footer>
    </article>
  );
}
