import { useState, useRef, useEffect } from "react";

import favorites from "mock/favorites";
import iCloud from "mock/icloud";
import mockWindowList from "mock/windowList";
const WindowContent = () => {
  const [windowList, setWindowList] = useState([...mockWindowList]);
  const ref = useRef(null);
  const refRight = useRef(null);
  useEffect(() => {
    const resizeableEle = ref.current;
    const styles = window.getComputedStyle(resizeableEle);
    let width = parseInt(styles.width, 10);
    let height = parseInt(styles.height, 10);
    let x = 0;
    let y = 0;
       // Right resize
       const onMouseMoveRightResize = (event) => {
        const dx = event.clientX - x;
        x = event.clientX;
        width = width + dx;
        resizeableEle.style.width = `${width}px`;
      };
  
      const onMouseUpRightResize = (event) => {
        document.removeEventListener("mousemove", onMouseMoveRightResize);
      };
  
      const onMouseDownRightResize = (event) => {
        x = event.clientX;
        resizeableEle.style.left = styles.left;
        resizeableEle.style.right = null;
        document.addEventListener("mousemove", onMouseMoveRightResize);
        document.addEventListener("mouseup", onMouseUpRightResize);
      };
      const resizerRight = refRight.current;
      resizerRight.addEventListener("mousedown", onMouseDownRightResize);
    return () => {};
  }, []);

  return (
    <div className="content">
      {windowList.map(function (value, i) {
        let position = {};
        if (value.position) {
          position.x = value.position.x;
          position.y = value.position.y;
  
        } else {
          position.x = "50%";
          position.y = "50%";
 
        }
        return (
          <div
          ref={ref}
            key={i}
            id={`window_${i + 1}`}
            className="content-box"
            style={{
              width: value.width,
              height: value.height,
              left: position.x,
              top: position.y,

            }}
          >
            <div className="resizer" >
              <div className="resizer-l"></div>
              <div ref={refRight} className="resizer-r"></div>
              <div className="resizer-b"></div>
              <div className="resizer-t"></div>
            </div>
            <div className="content-box">
              <div className="content-left" style={{ width: "100px" }}>
                <div className="content-btn-box">
                  <ul>
                    <li>
                      <span className="red-bt"></span>
                    </li>
                    <li>
                      <span className="yellow-bt"></span>
                    </li>
                    <li>
                      <span className="green-bt"></span>
                    </li>
                  </ul>
                </div>
                <div className="left-menu-box">
                  <div className="content-title favorites">
                    <span>즐겨찾기</span>
                  </div>
                  <ul className="content-list">
                    {favorites.map(function (a, i) {
                      return (
                        <li key={i}>
                          <span>{a.text}</span>
                        </li>
                      );
                    })}
                  </ul>
                  <div className="content-title favorites">
                    <span>iCloud</span>
                  </div>
                  <ul className="content-list">
                    {iCloud.map(function (a, i) {
                      return (
                        <li key={i}>
                          <span>{a.text}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
              <div className="content-right" style={{ width: "90%" }}>
                2222
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default WindowContent;
