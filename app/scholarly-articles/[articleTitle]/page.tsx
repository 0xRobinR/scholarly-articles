import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkMath from "remark-math";
import remarkRehype from "remark-rehype";
import rehypeKatex from "rehype-katex";
import rehypeStringify from "rehype-stringify";
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

  const result = await unified()
    .use(remarkParse)
    .use(remarkMath)
    .use(remarkRehype)
    .use(rehypeKatex)
    .use(rehypeStringify)
    .process(content);

  return {
    content: result.toString(),
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
    title: `${metadata.title}${metadata.oneLiner ? ` — ${metadata.oneLiner}` : ""}`,
    description: metadata.description as string,
    openGraph: {
      title: `${metadata.title}`,
      description: metadata.description as string,
      images: [`${baseUrl}/${metadata.image}`],
    },
    twitter: {
      card: "summary_large_image",
      title: `${metadata.title}`,
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
