"use client";

import { useState } from "react";
import Link from "next/link";
import { useArticles } from "../../hooks/useArticles";
import styles from "../../styles/modules/Blog.module.scss";

export default function ScholarlyArticles() {
  const articles = useArticles();
  const [filter, setFilter] = useState("");

  const allTags = Array.from(
    new Set(articles.flatMap((a) => a.tags.split(",").map((t) => t.trim()).filter(Boolean)))
  );

  const filtered = filter
    ? articles.filter((a) => a.tags.toLowerCase().includes(filter.toLowerCase()))
    : articles;

  return (
    <section className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.titleBar}>
            <span className={`${styles.dot} ${styles.red}`} />
            <span className={`${styles.dot} ${styles.yellow}`} />
            <span className={`${styles.dot} ${styles.green}`} />
            <span className={styles.titleBarText}>~/scholarly-articles</span>
          </div>
          <div className={styles.toolbar}>
            <span className={styles.prompt}>$</span>
            <span className={styles.cmd}>find . -name &quot;*.md&quot; -type f | sort -r</span>
            <span className={styles.count}>{filtered.length} results</span>
          </div>
        </div>

        <div className={styles.tags}>
          <button
            className={`${styles.tag} ${!filter ? styles.active : ""}`}
            onClick={() => setFilter("")}
          >
            all
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              className={`${styles.tag} ${filter === tag ? styles.active : ""}`}
              onClick={() => setFilter(filter === tag ? "" : tag)}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className={styles.list}>
          {filtered.map((article, i) => {
            const slug = article.file.replace(".md", "");
            const date = new Date(article.date);
            const dateStr = date.toISOString().split("T")[0];
            return (
              <Link
                key={article.file}
                href={`/scholarly-articles/${slug}`}
                className={styles.card}
              >
                <div className={styles.lineNumber}>{String(i + 1).padStart(2, "0")}</div>
                <div className={styles.thumb}>
                  <img src={article.image} alt="" />
                  <div className={styles.thumbOverlay}>
                    <span className={styles.thumbLabel}>preview</span>
                  </div>
                </div>
                <div className={styles.content}>
                  <div className={styles.titleRow}>
                    <h3 className={styles.title}>{article.title}</h3>
                    <span className={styles.date}>{dateStr}</span>
                  </div>
                  <p className={styles.desc}>{article.description}</p>
                  <div className={styles.meta}>
                    {article.tags.split(",").map((tag) => (
                      <span key={tag.trim()} className={styles.metaTag}>
                        {tag.trim()}
                      </span>
                    ))}
                    {article.oneLiner && (
                      <span className={styles.oneLiner}>// {article.oneLiner}</span>
                    )}
                  </div>
                </div>
                <div className={styles.arrow}>&rarr;</div>
              </Link>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className={styles.empty}>
            <span className={styles.prompt}>$</span> no articles matching &quot;{filter}&quot;
          </div>
        )}
      </div>
    </section>
  );
}
