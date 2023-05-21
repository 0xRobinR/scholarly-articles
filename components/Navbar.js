import Link from "next/link";
import styles from "../styles/modules/Navbar.module.scss";
import {
  FaHome,
  FaUserTie,
  FaCode, FaGit,
} from "react-icons/fa";
import { useRouter } from "next/router";

import { useRef } from "react";
const Navbar = () => {
  const router = useRouter();
  const navbar = useRef();

  // All Links in navbar

  const navLinks = [
    { href: "/", icon: <FaHome />, title: "home" },
    { href: "/about", icon: <FaUserTie />, title: "overview" },
    { href: "/scholarly-articles", icon: <FaGit />, title: "scholarly scholarly-articles", other: "scholarly-articles" },
  ];

  return (
    <nav
      className={styles.navbar}
      ref={navbar}
      onMouseMove={(e) => {
        for (var i = 1; i <= navLinks.length; i++) {
          navbar.current.children[i].children[1].style.top = e.pageY + "px";
        }
      }}
    >
      <div className={styles.siteTitle}>
        <FaCode />
      </div>
      {/* map all links */}
      {navLinks.map((navLink) => (
        <div className={styles.link} key={navLink.href}>
          <Link href={navLink.href}>
            <a
              className={
                styles.icon +
                " " +
                ((router.asPath === navLink.href || ( navLink.other && router.asPath.includes(navLink.other) )) ? styles.active : "") // change active class when route change (route = href > add active class)
              }
              onClick={() => navbar.current.classList.remove(styles.visible)} // in (large , medium, small) screens  when click on navbar link navbar close
              // used in arrow function to fix (ref undefined)
            >
              {navLink.icon}
            </a>
          </Link>
          <div className={styles.title}>
            <h6 className="mb-0">{navLink.title}</h6>
          </div>
        </div>
      ))}
      <hr style={{ width: "48px", margin: "1rem auto" }}></hr>
      {/* settings component */}
      {/*<Settings />*/}
      {/* theme component */}
      {/*<Theme />*/}
    </nav>
  );
};

export default Navbar;
