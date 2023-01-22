import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "../styles/style.scss";
import styles from "../styles/modules/App.module.scss";
import Navbar from "../components/Navbar";
import Preloader from "../components/Preloader";
import { useEffect } from "react";
import Head from "next/head";
import NavButton from "../components/NavButton";
import Colors from "../components/Colors";
const myApp = ({ Component, pageProps }) => {
  useEffect(() => {
    //get user color and theme from local storage
    const getUserData = () => {
      const html = document.documentElement; // access html (:root)
      html.style.setProperty("--main", "rgb(39, 94, 8)"); // set main color to qual to local storage main
      localStorage.getItem("theme") === "dark" // check theme in last session
        ? html.classList.add("dark")
        : html.classList.add("dark");
    };

    getUserData();
  });

  return (
    <>
      <Head>
        <title>
            For the Humankind, Unlocking the Full Potential
        </title>
      </Head>
      <div>
        <Navbar />
        <NavButton />
        <Colors />
      </div>
      <div className={styles.main}>
        <Preloader />
        <Component {...pageProps} />
      </div>
    </>
  );
};

export default myApp;
