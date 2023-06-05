import MenuBar from "component/desktop/menu/menuBar";
import WindowContent from "component/desktop/window/window";
import Dock from "component/desktop/dock/dock";
import { useSelector } from "react-redux";
import styles from "style/desktop.module.css"
const Desktop = () => {
  let winOverflow = useSelector((state) => {
    return state.winOverflow;
  });

  return (
    <div className={`${styles.desktop}${winOverflow ? '' : ` ${styles.over}`}`}>
      <div className={styles['window-box']}>
        <MenuBar />
        <div className={styles.window}>
          <WindowContent />
          <Dock />
        </div>
      </div>

    </div>
  );
};
export default Desktop;
