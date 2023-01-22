import styles from "../styles/modules/NavButton.module.scss";
import NavbarStyle from "../styles/modules/Navbar.module.scss"; // imported to toggle NavbarStyle.visible
import { useEffect, useRef } from "react";
const NavButton = () => {
  const navButton = useRef();

  useEffect(() => {
    let navbar = navButton.current.parentElement.children[0]; // access to navbar
    navButton.current.onclick = () => {
      navbar.classList.toggle(NavbarStyle.visible); // toggle Navbar
      navButton.current.classList.toggle(styles.active); // toggle burger menu
    };
    navbar.classList.contains(NavbarStyle.visible) // check if navbar closed without using navButton
      ? navButton.current.classList.add(styles.active)
      : navButton.current.classList.remove(styles.active);
  });

  return (
    <div className={styles.navButton} ref={navButton}>
      <span></span>
    </div>
  );
};

export default NavButton;
