"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";
import styles from "../styles/modules/FloatingNav.module.scss";
import ThemeSwitcher from "./ThemeSwitcher";

const navLinks = [
  { href: "/", label: "home" },
  { href: "/about", label: "overview" },
  { href: "/scholarly-articles", label: "articles" },
];

export default function FloatingNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <button
        className={`${styles.trigger} ${open ? styles.open : ""}`}
        onClick={() => setOpen(!open)}
      >
        <FaPlus />
      </button>
      <div
        className={`${styles.overlay} ${open ? styles.visible : ""}`}
        onClick={() => setOpen(false)}
      >
        <div className={styles.menu} onClick={(e) => e.stopPropagation()}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.link} ${
                pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href))
                  ? styles.active
                  : ""
              }`}
              onClick={() => setOpen(false)}
            >
              <span className={styles.prompt}>$</span>
              cd ~/{link.label}
            </Link>
          ))}
          <hr className={styles.divider} />
          <ThemeSwitcher />
        </div>
      </div>
    </>
  );
}
