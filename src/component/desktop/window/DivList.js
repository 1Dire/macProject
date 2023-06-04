import { useState, useRef, useEffect } from "react";

import { Rnd } from "react-rnd";
import favorites from "mock/favorites";
import iCloud from "mock/icloud";
import styled from "styled-components";

const ResizableDiv = (props) => {
  const ref = useRef(null);
  const [id] = useState(props.id);
  const [size, setSize] = useState({
    width: props.width,
    height: props.height,
  });

  const [positionX] = useState(props.positionX);
  const [positionY] = useState(props.positionY);
  const [moveMode, setMoveMode] = useState(true);
  const [position, setPosition] = useState({ x: 100, y: 200 });

  useEffect(() => {
    const resizeEle = ref.current;
    const styled = window.getComputedStyle(resizeEle);
    let contentWidth = styled.width;
    let contentHeight = styled.height;
    let paseWidth = parseInt(contentWidth, 10);
    let paseHeight = parseInt(contentHeight, 10);

    let positionWidth =
      (parseFloat(positionX.replace("%", "")) / 100) * paseWidth;
    let positionHeight =
      (parseFloat(positionY.replace("%", "")) / 100) * paseHeight;
    setPosition({ x: positionWidth, y: positionHeight });
  }, []);
  const handleContentClick = (e) => {
    e.stopPropagation();
    // 내부 컨텐츠를 클릭한 경우, 원하는 동작을 수행

    console.log("Content Clicked");
  };

  const handleBoxClick = () => {
    // 박스를 클릭한 경우, 원하는 동작을 수행
  };

  const handleResizeStop = (e, direction, ref, delta, position) => {
    // 모서리 클릭한 경우 원는 동작을 수행
    const { width, height } = ref.style;
    const { x, y } = position;
    setSize({ width, height });
    setPosition({ x, y });
  };

  const handleResize = (e, direction, ref, delta, position) => {};

  return (
    <div
      ref={ref}
      id={"rnd_" + id}
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
      }}
    >
      <Rnd
        style={{
          background: "lightgray",
          position: "absolute",
          zIndex: "3",
        }}
        size={size}
        position={position}
        disableDragging={moveMode}
        onDragStop={(e, d) => {
          console.log("e");
          setPosition({ x: d.x, y: d.y });
        }}
        onResizeStop={handleResizeStop}
        onResize={handleResize}
      >
        <div
          onMouseUp={handleContentClick}
          style={{ width: "100%", height: "100%" }}
        >
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
      </Rnd>
    </div>
  );
};

export default ResizableDiv;
