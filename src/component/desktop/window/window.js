import { useState, useEffect, useRef } from "react";
// import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import ResizableDiv from "./DivList";
import mockWindowList from "mock/windowList";

const WindowContent = () => {
  const [windowList, setWindowList] = useState([...mockWindowList]);
  const [contentWidth, setContentWidth] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);

  const ref = useRef(null);

  useEffect(() => {


    return () => {};
  }, []);

  return (
    <div id="content" className="content" ref={ref}>
      {windowList.map(function (value, i) {
        let id = value.id;
        let name = value.name;
        let width = value.width;
        let height = value.height;
        let postionX = value.position.x;
        let positionY = value.position.y;
        return (
          <ResizableDiv
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
