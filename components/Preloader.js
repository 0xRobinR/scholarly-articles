import styles from "../styles/modules/Preloader.module.scss";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
const Preloader = () => {
  const router = useRouter();
  const preloader = useRef();

  useEffect(() => {
    const body = document.body;
    // [ Method ] show preloader when route change
    router.events.on("routeChangeStart", () => {
      //show preloader and scroll
      body.style.overflowY = "hidden";
      preloader.current.classList.add(styles.show);
    });
    router.events.on("routeChangeComplete", () => {
      //hide preloader and scroll
      setTimeout(() => {
        body.style.overflowY = "auto";
        preloader.current.classList.remove(styles.show);
      }, 800);
    });
  });

  return (
    <div className={styles.preloader} ref={preloader}>
      <span className={styles.spinner}></span>
    </div>
  );
};

export default Preloader;
