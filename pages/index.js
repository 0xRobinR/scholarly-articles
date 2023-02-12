import styles from "../styles/modules/Home.module.scss";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaDribbble,
  FaLinkedinIn,
  FaTiktok, FaGithub, FaArrowRight,
} from "react-icons/fa";
import Typewriter from "typewriter-effect";
import {githubProfile, linkedInProfile, twitterProfile} from "../config";
import Link from "next/link";
const Home = () => {
  return (
    <section className={styles.home}>
      <div className="container">
        <div className="row">
          <div className="col-lg-6 align-self-center">
            <div className={styles.left}>
              <h1 className="mb-3">robin rajput</h1>
              <h4 className="mb-0">
                {/* typewriter component */}
                <Typewriter
                  options={{
                    strings: [
                      "core buidler",
                      "coding the endgame",
                      "for the humankind",
                    ],
                    autoStart: true,
                    loop: true,
                  }}
                />
              </h4>
              <div className={"mt-4"}>
                <Link href={"/scholarly-articles"}>
                  <button type="submit" className="main-button">
                    <span className="main-button-icon">
                      <FaArrowRight />
                    </span>
                    <h6 className="main-button-title">goto articles</h6>
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-8 col-9 mx-auto">
            <div className={styles.imageContainer}>
              <img src="/home.jpg" alt="home image" />
            </div>
          </div>
        </div>
      </div>
      {/* social media icons */}
      <div className={styles.social}>
        <a target={"_blank"} href={githubProfile} className="ms-1">
          <FaGithub />
        </a>
        <a target={"_blank"} href={twitterProfile} className="ms-1">
          <FaTwitter />
        </a>
        <a target={"_blank"} href={linkedInProfile} className="ms-1">
          <FaLinkedinIn />
        </a>
      </div>
    </section>
  );
};

export default Home;
