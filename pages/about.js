import styles from "../styles/modules/About.module.scss";
import {
  FaUser,
  FaBirthdayCake,
  FaAt,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaDownload,
} from "react-icons/fa";
import Skills from "../components/Skills";
import Resume from "../components/Resume";
import Testimonial from "../components/Testimonial";
const About = () => {
  return (
    <section className={styles.about}>
      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
            <h2 className="section-title mb-0">overview</h2>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-lg-4 align-self-center">
            <h3 className="mb-3">hello world!</h3>
            <p className="mb-4">
              hello , I'm <b>what's your url says</b> , a core bui<b>dl</b>er. Interested and curious about
              the fundamental workings of anything related to computer. There are many problems to be solved,
              working on it since 2017, created and managed many patches <br/>( Thanks to blockchain ) <b>#WAGMI</b>
            </p>
          </div>
          <div className="col-lg-4 col-md-8 align-self-center my-lg-0 my-5 mx-auto ">
            {/* About Image */}
            <div className={styles.imageContainer}>
              <img src="/about.jpg" alt="about image" />
            </div>
          </div>
          <div className="col-lg-4 align-self-center">
            {/* information table (map function not used because elements not the same) */}
            <div className={styles.box}>
              <div className={styles.info}>
                <span className={styles.infoIcon}>
                  <FaUser />
                </span>
                <h6 className={styles.infoTitle}>name:</h6>
                <p className="mb-0">robin rajput</p>
              </div>
              <div className={styles.info}>
                <span className={styles.infoIcon}>
                  <FaAt />
                </span>
                <h6 className={styles.infoTitle}>reach:</h6>
                <p className="mb-0">
                  <a href="mailto:explain.this@robinrajput.com">explain.this@robinrajput.com</a>
                </p>
              </div>
              <div className={styles.info}>
                <span className={styles.infoIcon}>
                  <FaMapMarkerAlt />
                </span>
                <h6 className={styles.infoTitle}>location:</h6>
                <p className="mb-0">
                  <a href="#">
                    milky way galaxy
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Skills />
    </section>
  );
};

export default About;
