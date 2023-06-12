import { useState, useEffect, useRef } from "react";
import ResizableDiv from "./DivList";
//mock
import mockWindowList from "mock/windowList";
//css
import styles from "style/window.module.css";
import { useSelector } from "react-redux";

const WindowContent = () => {
  let openWindowList = useSelector((state) => {
    return state.openWindowList;
  });
  let mockMode = useSelector((state) => {
    return state.mockMode;
  }); // 목업 모드
  //state
  const [windowList, setWindowList] = useState([]);

  //useEffect
  useEffect(() => {
    let array = [];
    if (mockMode) {
      openWindowList.forEach((i) => {
        mockWindowList.forEach((j) => {
          if (i.name === j.name) {
            j.id = i.id;
            j.show = i.show;
            j.zIndex = i.zIndex;
            array.push(j);
          }
        });
      });
      setWindowList(array);
    } else {
    }

    return () => {};
  }, [openWindowList]);

  return (
    <div id="content" className={styles.content}>
      {windowList.map(function (value, i) {
        let id = value.id;
        let name = value.name;
        let width = value.width;
        let height = value.height;
        let postionX = value.position.x;
        let positionY = value.position.y;
        let show = value.show;
        let zIndex = value.zIndex;
        let render;
        if (name === "Finder") {
          render = (
            <ResizableDiv
              zIndex={zIndex}
              id={id}
              name={name}
              width={width}
              height={height}
              positionX={postionX}
              positionY={positionY}
              show={show}
            ></ResizableDiv>
            
          );
        }
        return <div key={i}>{render}</div>;
      })}
    </div>
  );
};

export default WindowContent;
