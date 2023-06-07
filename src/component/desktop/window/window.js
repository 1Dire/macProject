import { useState, useEffect, useRef } from "react";
import ResizableDiv from "./DivList";
//mock
import mockWindowList from "mock/windowList";
//css
import styles from "style/window.module.css";

const WindowContent = () => {
  //state
  const [windowList, setWindowList] = useState([...mockWindowList]);
  let length = windowList.length;
  //useEffect
  useEffect(() => {
    return () => {};
  }, []);

  return (
    <div id="content" className={styles.content}>
      {windowList.map(function (value, i) {
        let zIndex = length;
        length - 1;
        let id = value.id;
        let name = value.name;
        let width = value.width;
        let height = value.height;
        let postionX = value.position.x;
        let positionY = value.position.y;
        return (
          <ResizableDiv
            zIndex={zIndex}
            key={i}
            id={id}
            name={name}
            width={width}
            height={height}
            positionX={postionX}
            positionY={positionY}
          ></ResizableDiv>
        );
      })}
    </div>
  );
};

export default WindowContent;
