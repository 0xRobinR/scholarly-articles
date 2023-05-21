import styles from "../../styles/modules/Articles.module.scss"
import {useRouter} from "next/router";
import MarkdownContent from "./content";

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import {remark} from 'remark';
import html from 'remark-html';
import MetaData from "../../metadata.json"
import Head from "next/head";
import {baseUrl} from "../../config";

export async function getStaticPaths({articleTitle}) {
    const titles = MetaData.articles.map((article) => article.file.replace(".md", ""))
    const articleTitles = titles;

    const paths = articleTitles.map((title) => ({
        params: { articleTitle: title }
    }));

    return {
        paths,
        fallback: false
    };
}

export async function getStaticProps({params}) {
    const { articleTitle } = params;
    const articlesDirectory = path.join(process.cwd(), 'articles');
    const filePath = path.join(articlesDirectory, `${articleTitle}.md`);
    console.log(filePath)
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { content, data } = matter(fileContent);

    console.log(content, data)

    const processedContent = await remark().use(html).process(content);
    const contentHtml = processedContent.toString();

    const dateString = data.date.toISOString(); // Convert to ISO string or any desired format

    return {
        props: {
            // Pass the fetched article content and metadata as props
            content: contentHtml,
            metadata: {
                ...data,
                date: dateString,
                file: `${articleTitle}.md`
            }
        }
    };
}

const Articles = ({ content, metadata }) => {
    const router = useRouter()
    const { asPath } = router;

    console.debug(router)

    return (
        <>
            <Head>
                <title>{metadata.title} - {metadata.oneLiner}</title>
                <meta property={"og:title"} content={`${metadata.title} - ${metadata.oneLiner}`} />
                <meta property={"og:description"} content={metadata.description} />
                <meta property={"og:image"} content={`${baseUrl}/${metadata.image}`} />
                <meta property={"og:url"} content={`${baseUrl}${asPath}`} />
            </Head>
            <section className={styles.article}>
                <div className="container">
                    <div className="row">
                        <div className="col-12 text-center">
                            <h2 className="mb-1 text-lowercase">
                                article #{metadata.index}
                            </h2>
                            <button onClick={() => {
                                router.push("/scholarly-articles").then(r => {})
                            }} className={"btn btn-outline-secondary"}>goto articles</button>
                        </div>
                    </div>
                    <div className="row mt-5 justify-content-center">
                        <MarkdownContent content={content} metadata={metadata} />
                    </div>
                </div>
            </section>
        </>
    )
}

export default Articles