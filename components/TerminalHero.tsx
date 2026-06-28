"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { FaGithub, FaTwitter, FaLinkedinIn, FaArrowRight } from "react-icons/fa";
import { githubProfile, twitterProfile, linkedInProfile } from "../config";
import { useArticles, type Article } from "../hooks/useArticles";
import styles from "../styles/modules/TerminalHero.module.scss";

type LineType = "command" | "output" | "articles" | "summary";

interface Line {
  type: LineType;
  text: string;
}

function buildSequence(articles: Article[]): Line[] {
  const latest = articles.slice(0, 5);
  return [
    { type: "command", text: "whoami" },
    { type: "output", text: "robin rajput" },
    { type: "command", text: "cat role.txt" },
    { type: "output", text: "core builder | coding the endgame" },
    { type: "command", text: "ls -lt articles/ | head -5" },
    ...latest.map((a) => ({
      type: "articles" as LineType,
      text: `${a.file.replace(".md", "")}|${a.title}|${a.tags}`,
    })),
    { type: "summary", text: `total: ${articles.length} scholarly articles indexed` },
    { type: "command", text: "echo $MISSION" },
    { type: "output", text: "for the humankind" },
    { type: "command", text: "cat socials.txt" },
  ];
}

export default function TerminalHero() {
  const articles = useArticles();
  const [sequence, setSequence] = useState<Line[]>([]);
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [typedLines, setTypedLines] = useState<{ line: Line; text: string }[]>([]);
  const [showCta, setShowCta] = useState(false);

  useEffect(() => {
    if (articles.length > 0 && sequence.length === 0) {
      setSequence(buildSequence(articles));
    }
  }, [articles, sequence.length]);

  const currentLine = sequence[lineIndex];
  const isTypingCommand = currentLine?.type === "command";
  const typeSpeed = isTypingCommand ? 30 : 12;

  useEffect(() => {
    if (sequence.length === 0 || lineIndex >= sequence.length) return;

    const line = sequence[lineIndex];
    const displayText = line.text;

    if (charIndex < displayText.length) {
      const timer = setTimeout(() => setCharIndex((c) => c + 1), typeSpeed);
      return () => clearTimeout(timer);
    }

    const nextDelay = line.type === "command" ? 300 : 80;
    const timer = setTimeout(() => {
      setTypedLines((prev) => [...prev, { line, text: displayText }]);
      setLineIndex((l) => l + 1);
      setCharIndex(0);
    }, nextDelay);
    return () => clearTimeout(timer);
  }, [sequence, lineIndex, charIndex, typeSpeed]);

  useEffect(() => {
    if (sequence.length > 0 && lineIndex >= sequence.length && !showCta) {
      const timer = setTimeout(() => setShowCta(true), 300);
      return () => clearTimeout(timer);
    }
  }, [lineIndex, sequence.length, showCta]);

  const renderLine = useCallback(
    (entry: { line: Line; text: string }, i: number) => {
      const { line } = entry;
      if (line.type === "command") {
        return (
          <div key={i} className={styles.line}>
            <span className={styles.command}>
              <span className={styles.prompt}>$</span> {entry.text}
            </span>
          </div>
        );
      }
      if (line.type === "articles") {
        const [slug, title, tags] = line.text.split("|");
        return (
          <div key={i} className={styles.line}>
            <span className={styles.articleLine}>
              <Link href={`/scholarly-articles/${slug}`} className={styles.articleLink}>
                {title}
              </Link>
              <span className={styles.articleMeta}>{tags}</span>
            </span>
          </div>
        );
      }
      if (line.type === "summary") {
        return (
          <div key={i} className={styles.line}>
            <span className={styles.summaryText}>{entry.text}</span>
          </div>
        );
      }
      return (
        <div key={i} className={styles.line}>
          <span className={styles.output}>&gt; {entry.text}</span>
        </div>
      );
    },
    []
  );

  const currentDisplay = () => {
    if (sequence.length === 0 || lineIndex >= sequence.length) return null;
    const line = sequence[lineIndex];
    const partial = line.text.slice(0, charIndex);

    if (line.type === "command") {
      return (
        <div className={styles.line}>
          <span className={styles.command}>
            <span className={styles.prompt}>$</span> {partial}
          </span>
          <span className="cursor" />
        </div>
      );
    }
    if (line.type === "articles") {
      const [slug, title, tags] = line.text.split("|");
      const titleEnd = slug.length + 1 + title.length;
      return (
        <div className={styles.line}>
          <span className={styles.articleLine}>
            {charIndex <= titleEnd ? (
              <span className={styles.articleLink}>{partial.slice(slug.length + 1, titleEnd)}</span>
            ) : (
              <>
                <span className={styles.articleLink}>{title}</span>
                <span className={styles.articleMeta}>{partial.slice(titleEnd + 1)}</span>
              </>
            )}
          </span>
          <span className="cursor" />
        </div>
      );
    }
    return (
      <div className={styles.line}>
        <span className={styles.output}>&gt; {partial}</span>
        <span className="cursor" />
      </div>
    );
  };

  return (
    <section className={styles.hero}>
      <div className={styles.terminal}>
        <div className={styles.titleBar}>
          <span className={`${styles.dot} ${styles.red}`} />
          <span className={`${styles.dot} ${styles.yellow}`} />
          <span className={`${styles.dot} ${styles.green}`} />
          <span className={styles.titleText}>robin@dev ~ </span>
        </div>
        <div className={styles.body}>
          {typedLines.map((entry, i) => renderLine(entry, i))}
          {currentDisplay()}
          {showCta && (
            <>
              <div className={styles.socials}>
                <a href={githubProfile} target="_blank"><FaGithub /></a>
                <a href={twitterProfile} target="_blank"><FaTwitter /></a>
                <a href={linkedInProfile} target="_blank"><FaLinkedinIn /></a>
              </div>
              <div className={`${styles.cta} ${styles.visible}`}>
                <Link href="/scholarly-articles" className={styles.ctaLink}>
                  <FaArrowRight /> goto articles
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
