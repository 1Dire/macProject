import { useState, useEffect, useRef } from "react";
// import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import ResizableDiv from "./DivList";
import mockWindowList from "mock/windowList";
import { useSelector, useDispatch } from "react-redux";
import { openWindowListAdd } from "store";
import styles from 'style/window.module.css'

const WindowContent = () => {
  let dispatch = useDispatch();
  let openWindowList = useSelector((state) => {
    return state.openWindowList;
  });
  const test = () => {
    console.log('전')
    dispatch(openWindowListAdd("d"));
  };
  const [windowList, setWindowList] = useState([...mockWindowList]);

  const ref = useRef(null);
  let length = windowList.length;
  useEffect(() => {
    return () => {};
  }, []);

  return (
    <div id="content" className={styles.content} ref={ref} onClick={test}>
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
