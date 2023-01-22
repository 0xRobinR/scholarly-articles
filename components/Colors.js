import { useRef } from "react";
import styles from "../styles/modules/Colors.module.scss";
const Colors = () => {
  const colors = useRef();
  // allColors information
  const allColors = [
    { color: "#007bff" },
    { color: "#ff006a" },
    { color: "#7e00ff" },
    { color: "#16c63e" },
    { color: "#ff6d00" },
  ];

  // [ method ] when click on span main color variable will change to span's backgroundColor
  // change main color
  const changeColor = (e) => {
    const html = document.documentElement; // access to html (:root variables)
    html.style.setProperty("--main", e.target.style.backgroundColor); // change (--main) in (:root)
    colors.current.classList.remove(styles.active); // hide colors menu
    localStorage.setItem("main", e.target.style.backgroundColor); // save the color in local storage for next session
  };

  return (
    <div className={styles.colors} ref={colors}>
      {/* map allColor information */}
      {allColors.map((color) => (
        <span
          key={color.color}
          style={{ backgroundColor: color.color }}
          onClick={changeColor}
        ></span>
      ))}
    </div>
  );
};

export default Colors;
