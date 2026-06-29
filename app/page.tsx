import Link from "next/link";
import MetaData from "../metadata.json";
import styles from "../styles/modules/Blog.module.scss";

export default function Home() {
  const articles = MetaData.articles;

  return (
    <section className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>scholarly articles</h1>
        <p className={styles.subtitle}>
          pre-scholarly drafts on blockchain, cryptography, and decentralized systems — by robin rajput
        </p>
      </header>

      <div className={styles.list}>
        {articles.map((article) => {
          const slug = article.file.replace(".md", "");
          const date = new Date(article.date).toISOString().split("T")[0];
          const tags = article.tags.split(",").map((t) => t.trim()).filter(Boolean);
          return (
            <Link key={article.file} href={`/scholarly-articles/${slug}`} className={styles.card}>
              <div className={styles.cardInner}>
                <div className={styles.cardText}>
                  <h2 className={styles.cardTitle}>{article.title}</h2>
                  <p className={styles.cardDesc}>{article.description}</p>
                  <div className={styles.cardMeta}>
                    <span className={styles.date}>{date}</span>
                    {tags.map((tag) => (
                      <span key={tag} className={styles.tag}>{tag}</span>
                    ))}
                  </div>
                </div>
                <div className={styles.cardImage}>
                  <img src={article.image} alt="" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
