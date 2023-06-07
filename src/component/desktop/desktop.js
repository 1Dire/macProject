import { useState, useEffect, useRef } from "react";
//컴포넌트
import MenuBar from "component/desktop/menu/menuBar";
import WindowContent from "component/desktop/window/window";
import Dock from "component/desktop/dock/dock";
import { useSelector, useDispatch } from "react-redux";
//redux
import { change } from "store";
//css
import styles from "style/desktop.module.css";
const Desktop = () => {
  //state
  const [winHeight, setHeight] = useState(window.innerHeight); //브라우저 높이
  //ref
  const ref = useRef(null);
  //redux
  let dispatch = useDispatch();
  let winOverflow = useSelector((state) => {
    return state.winOverflow;
  });
  //method
  const handleResize = () => {
    //브라우저 크기 변화시
    const resizeEle = ref.current;
    const styled = window.getComputedStyle(resizeEle);
    let contentHeight = parseInt(styled.height, 10);
    setHeight(window.innerHeight);
    dispatch(change(winHeight < contentHeight ? false : true));
  };
  //useEffect
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });
  return (
    <div
      ref={ref}
      className={`${styles.desktop}${winOverflow ? "" : ` ${styles.over}`}`}
    >
      <div className={styles["window-box"]}>
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
