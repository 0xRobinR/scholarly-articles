"use client";

import { useEffect, useMemo, useState } from "react";
import MetaData from "../metadata.json";

export interface Article {
  file: string;
  title: string;
  author: string;
  date: string;
  tags: string;
  index: number;
  label: string;
  image: string;
  description: string;
  oneLiner: string | null;
  buttonLabel: string;
}

export const useArticles = (): Article[] => {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    setArticles(MetaData.articles as Article[]);
  }, []);

  return useMemo(() => articles, [articles]);
};
