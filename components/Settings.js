import styles from "../styles/modules/Settings.module.scss";
import { FaCog } from "react-icons/fa";
const Settings = () => {
  return (
    <div className={styles.settings}>
      <div
        className={styles.icon}
        onClick={() =>
          document
            .querySelector(".Colors_colors__n_9sE")
            .classList.toggle("Colors_active__WvB_f")
        } // show colors menu
      >
        <FaCog className={styles.iconContent} />
      </div>
    </div>
  );
};

export default Settings;
