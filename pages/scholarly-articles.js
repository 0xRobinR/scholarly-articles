import styles from "../styles/modules/Blog.module.scss";
import {FaCode} from "react-icons/fa";
import {useArticles} from "../hooks/useArticles";
import {useRouter} from "next/router";
import {useCallback} from "react";

const ScholarlyArticles = () => {
    const router = useRouter()

    const articles = useArticles()

    const handleClick = useCallback((e) => {
        router.push(e).then(r => {})
    }, [router])

    return (
        <section className={styles.blog}>
            <div className="container">
                <div className="row">
                    <div className="col-12 text-center">
                        <h2 className="section-title mb-0">
                            pre-scholarly<br /> articles
                        </h2>
                        <span>these are draft articles, just proposals, and needs to be peer-reviewed</span>
                    </div>
                </div>
                <div className="row mt-5 justify-content-center">
                    {/* flex-wrap-reverse and flex-row-reverse used for make the last element in the top */}
                    {/* map blog information */}
                    {/*<span className={"text-center"}>still building the blocks for robinrajput.com</span>*/}
                    {articles.map((blog) => (
                        <div className="col-lg-4 col-md-6" style={{cursor: "pointer"}} key={blog.image} onClick={() => {handleClick( `/scholarly-articles/${blog.file.replace(".md", "")}` )}}>
                            <div className={styles.box}>
                                <div className={styles.image}>
                                    <img src={blog.image} alt=""/>
                                </div>
                                <h3 className="mt-4 mb-2 text-lowercase">{blog.title}</h3>
                                <div className={styles.date}>
                                    <span className={styles.icon}>
                                        <FaCode />
                                    </span>
                                    <h6 className="mb-1 align-self-end text-lowercase">{blog?.oneLiner}</h6>
                                </div>
                                <div className="mt-3 mb-3">
                                    <span className="text-lowercase" >{blog.description}</span>
                                </div>
                                <a onClick={() => {
                                    handleClick( `/scholarly-articles/${blog.file.replace(".md", "")}` )
                                }} className={styles.read}>
                                    {blog.buttonLabel}
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ScholarlyArticles;
