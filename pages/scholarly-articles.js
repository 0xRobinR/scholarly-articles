import styles from "../styles/modules/Blog.module.scss";
import { FaCalendarAlt } from "react-icons/fa";
const ScholarlyArticles = () => {
  //blog information
  const blogs = [
  ];

  return (
    <section className={styles.blog}>
      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
            <h2 className="section-title mb-0">
              scholarly articles
            </h2>
          </div>
        </div>
        <div className="row mt-5">
          {/* flex-wrap-reverse and flex-row-reverse used for make the last element in the top */}
          {/* map blog information */}
          <span className={"text-center"}>still building the blocks for robinrajput.com</span>
          {blogs.map((blog) => (
            <div className="col-lg-4 col-md-6" key={blog.image}>
              <div className={styles.box}>
                <div className={styles.image}>
                  <img src={blog.image} alt="" />
                </div>
                <h3 className="mt-4 mb-2">{blog.title}</h3>
                <div className={styles.date}>
                  <span className={styles.icon}>
                    <FaCalendarAlt />
                  </span>
                  <h6 className="mb-0 align-self-end">{blog.date}</h6>
                </div>
                <p className="mt-3 mb-3">
                  lorem ipsum is simply dummy text of the printing and
                  typesetting industry.
                </p>
                <a href="#" className={styles.read}>
                  read this article
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
