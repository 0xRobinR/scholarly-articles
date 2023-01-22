import styles from "../styles/modules/Theme.module.scss";
import { FaAdjust } from "react-icons/fa";
const Theme = () => {
  // [ Method ] when click on theme icon => toggle dark class in html tag (dark class change root variables to fit with dark)
  // toggle Dark and Light Themes
  const changeTheme = () => {
    const html = document.documentElement; // access html (:root)
    html.classList.toggle("dark"); // add or remove dark class
    html.classList.contains("dark") // check if html has dark class
      ? localStorage.setItem("theme", "dark") // if html has dark class save in local storage for next session
      : localStorage.setItem("theme", "light"); // if html has not dark class save in local storage for next session
  };

  return (
    <div className={styles.theme}>
      <div className={styles.icon} onClick={changeTheme}>
        <FaAdjust />
      </div>
    </div>
  );
};

export default Theme;
