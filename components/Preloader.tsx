"use client";

import styles from "../styles/modules/Preloader.module.scss";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export default function Preloader() {
  const pathname = usePathname();
  const preloader = useRef<HTMLDivElement>(null);
  const prevPathname = useRef(pathname);

  useEffect(() => {
    if (prevPathname.current === pathname) return;
    prevPathname.current = pathname;

    const body = document.body;
    body.style.overflowY = "hidden";
    preloader.current?.classList.add(styles.show);

    const timeout = setTimeout(() => {
      body.style.overflowY = "auto";
      preloader.current?.classList.remove(styles.show);
    }, 800);

    return () => clearTimeout(timeout);
  }, [pathname]);

  return (
    <div className={styles.preloader} ref={preloader}>
      <span className={styles.spinner}></span>
    </div>
  );
}
