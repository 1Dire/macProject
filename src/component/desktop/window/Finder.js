import { useState, useRef, useEffect } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Rnd } from "react-rnd";
import favorites from "mock/favorites";
import iCloud from "mock/icloud";
import styles from "style/Finder.module.css";
import { useSelector, useDispatch } from "react-redux";
import {
  openWindowListRemove,
  openWindowShowChange,
  zIndexChange,
} from "store";

const ResizableDiv = (props) => {
  let openWindowList = useSelector((state) => {
    return state.openWindowList;
  });
  let dispatch = useDispatch();
  const ref = useRef(null);
  const [id] = useState(props.id);
  const [size, setSize] = useState({
    width: props.width,
    height: props.height,
  });
  const [zIndex, setIndex] = useState(props.zIndex);
  const [positionX] = useState(props.positionX);
  const [positionY] = useState(props.positionY);
  const [isMinimized, setIsMinimized] = useState(props.show); //최소화
  const [moveMode, setMoveMode] = useState(true);
  const [position, setPosition] = useState({ x: 0, y: 0 }); // 초기 위치
  const [showComponent, setShowComponent] = useState(false);
  const [transition, setTransition] = useState(false);
  useEffect(() => {
    setIsMinimized(props.show);
  }, [props]);
  useEffect(() => {
    const resizeEle = props.contentRef.current;
    let styled = window.getComputedStyle(resizeEle);

    let contentWidth = styled.width;
    let contentHeight = styled.height;
    let paseWidth = parseInt(contentWidth, 10);
    let paseHeight = parseInt(contentHeight, 10);

    let positionWidth =
      (parseFloat(positionX.replace("%", "")) / 100) * paseWidth;
    let positionHeight =
      (parseFloat(positionY.replace("%", "")) / 100) * paseHeight;
    setPosition({ x: positionWidth, y: positionHeight });
    setShowComponent(true);
  }, []);
  const handleContentClick = (e) => {
    e.stopPropagation();
    // 내부 컨텐츠를 클릭한 경우, 원하는 동작을 수행
  };

  const handleBoxClick = () => {
    // 박스를 클릭한 경우, 원하는 동작을 수행
    let topZindex = openWindowList.reduce((prev, current) => {
      return prev.zIndex > current.zIndex ? prev : current;
    });

    if (topZindex.id !== id) {
      let param = {
        index: openWindowList.findIndex((item) => item.id === id),
        topZindex: topZindex.zIndex + 1,
      };

      dispatch(zIndexChange(param));
    }
  };

  const handleResizeStop = (e, direction, ref, delta, position) => {
    // 모서리 클릭한 경우 원는 동작을 수행
    const { width, height } = ref.style;
    const { x, y } = position;
    setSize({ width, height });
    setPosition({ x, y });
  };

  const handleResize = (e, direction, ref, delta, position) => {};
  const closeWindow = () => {
    let index = openWindowList.findIndex((item) => item.id === id);
    // //닫기버튼 클릭시
    dispatch(openWindowListRemove(index));
  };
  const minimizeBt = () => {
    let index = openWindowList.findIndex((item) => item.id === id);
    dispatch(openWindowShowChange(index));
  };
  return (
    <>
      {showComponent && (
        <Rnd
          style={{
            position: "absolute",
            zIndex: zIndex,
          }}
          onMouseEnter={() => {
            setTransition(true);
          }}
          onMouseLeave={() => {
            setTransition(false);
          }}
          size={size}
          position={position}
          disableDragging={moveMode}
          onDragStop={(e, d) => {
            setPosition({ x: d.x, y: d.y });
          }}
          className={`${styles.window} ${isMinimized ? "" : styles.minimized} ${
            transition || moveMode ? styles.grap : ""
          }`}
          onResizeStop={handleResizeStop}
          onResize={handleResize}
          onClick={handleBoxClick}
        >
          <div
            onMouseUp={handleContentClick}
            style={{ width: "100%", height: "100%" }}
          >
            <div className={styles["content-box"]}>
              <div
                className={styles["content-left"]}
                style={{ width: "100px" }}
              >
                <div
                  className={styles["content-btn-box"]}
                  onClick={() => {
                    setMoveMode(false);
                  }}
                  onMouseEnter={() => {
                    setMoveMode(false);
                  }}
                  onMouseLeave={() => {
                    setMoveMode(true);
                  }}
                >
                  <ul>
                    <li>
                      <span
                        className={styles["red-bt"]}
                        onMouseEnter={() => {
                          setMoveMode(true);
                        }}
                        onMouseLeave={() => {
                          setMoveMode(false);
                        }}
                        onClick={() => {
                          closeWindow();
                        }}
                      ></span>
                    </li>
                    <li>
                      <span
                        className={styles["yellow-bt"]}
                        onMouseEnter={() => {
                          setMoveMode(true);
                        }}
                        onMouseLeave={() => {
                          setMoveMode(false);
                        }}
                        onClick={() => {
                          minimizeBt();
                        }}
                      ></span>
                    </li>
                    <li>
                      <span
                        className={styles["green-bt"]}
                        onMouseEnter={() => {
                          setMoveMode(true);
                        }}
                        onMouseLeave={() => {
                          setMoveMode(false);
                        }}
                      ></span>
                    </li>
                  </ul>
                </div>
                <div className={styles["left-menu-box"]}>
                  <div
                    className={`${styles["content-title"]} ${styles.favorites}`}
                  >
                    <span>즐겨찾기</span>
                  </div>
                  <ul className={styles["content-list"]}>
                    {favorites.map(function (a, i) {
                      return (
                        <li key={i}>
                          <span>{a.text}</span>
                        </li>
                      );
                    })}
                  </ul>
                  <div
                    className={`${styles["content-title"]} ${styles.favorites}`}
                  >
                    <span>iCloud</span>
                  </div>
                  <ul className={`${styles["content-list"]}`}>
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
              <div className={styles["content-right"]} style={{ width: "90%" }}>
                <div
                  className={styles["top-bar"]}
                  onClick={() => {
                    setMoveMode(false);
                  }}
                  onMouseEnter={() => {
                    setMoveMode(false);
                  }}
                  onMouseLeave={() => {
                    setMoveMode(true);
                  }}
                >
                  <ul>
                    <li className={styles["top-bar-icon"]}>
                      <div>
                        <span
                          onMouseEnter={() => {
                            setMoveMode(true);
                          }}
                          onMouseLeave={() => {
                            setMoveMode(false);
                          }}
                        >
                          <FiChevronLeft></FiChevronLeft>
                        </span>

                        <span
                          onMouseEnter={() => {
                            setMoveMode(true);
                          }}
                          onMouseLeave={() => {
                            setMoveMode(false);
                          }}
                        >
                          <FiChevronRight></FiChevronRight>
                        </span>
                      </div>
                    </li>
                    <li className={styles.title}>
                      <span>Finder</span>
                    </li>
                    <li>3ㅇ</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Rnd>
      )}
    </>
  );
};

export default ResizableDiv;
