import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import type { Metadata } from "next";
import { baseUrl } from "../../../config";
import ArticleView from "./ArticleView";
import MetaData from "../../../metadata.json";

interface ArticleData {
  content: string;
  metadata: Record<string, string | number | null>;
}

async function getArticle(articleTitle: string): Promise<ArticleData> {
  const articlesDirectory = path.join(process.cwd(), "articles");
  const filePath = path.join(articlesDirectory, `${articleTitle}.md`);
  const fileContent = fs.readFileSync(filePath, "utf8");
  const { content, data } = matter(fileContent);
  const processedContent = await remark().use(html).process(content);

  return {
    content: processedContent.toString(),
    metadata: {
      ...data,
      date: data.date.toISOString(),
      file: `${articleTitle}.md`,
    },
  };
}

export async function generateStaticParams() {
  return MetaData.articles.map((article) => ({
    articleTitle: article.file.replace(".md", ""),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ articleTitle: string }>;
}): Promise<Metadata> {
  const { articleTitle } = await params;
  const { metadata } = await getArticle(articleTitle);

  return {
    title: `${metadata.title} - ${metadata.oneLiner}`,
    openGraph: {
      title: `${metadata.title} - ${metadata.oneLiner}`,
      description: metadata.description as string,
      images: [`${baseUrl}/${metadata.image}`],
    },
    twitter: {
      card: "summary_large_image",
      title: `${metadata.title} - ${metadata.oneLiner}`,
      description: metadata.description as string,
      images: [`${baseUrl}/${metadata.image}`],
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ articleTitle: string }>;
}) {
  const { articleTitle } = await params;
  const { content, metadata } = await getArticle(articleTitle);

  return <ArticleView content={content} metadata={metadata} />;
}
