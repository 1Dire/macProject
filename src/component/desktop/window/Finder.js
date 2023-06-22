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
  const ref = useRef(null);
  const dispatch = useDispatch();

  const openWindowList = useSelector((state) => state.openWindowList);

  const { id, width, height, zIndex, positionX, positionY, show } = props;

  const [size, setSize] = useState({ width, height });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isMinimized, setIsMinimized] = useState(show);
  const [moveMode, setMoveMode] = useState(true);
  const [showComponent, setShowComponent] = useState(false);
  const [transition, setTransition] = useState(false);

  useEffect(() => {
    setIsMinimized(show);
  }, [show]);

  useEffect(() => {
    const resizeEle = props.contentRef.current;
    const styled = window.getComputedStyle(resizeEle);

    const contentWidth = styled.width;
    const contentHeight = styled.height;
    const parsedWidth = parseInt(contentWidth, 10);
    const parsedHeight = parseInt(contentHeight, 10);

    const positionWidth =
      (parseFloat(positionX.replace("%", "")) / 100) * parsedWidth;
    const positionHeight =
      (parseFloat(positionY.replace("%", "")) / 100) * parsedHeight;

    setPosition({ x: positionWidth, y: positionHeight });
    setShowComponent(true);
  }, []);

  const handleContentClick = (e) => {
    e.stopPropagation();
    // 내부 컨텐츠를 클릭한 경우, 원하는 동작을 수행
  };

  const handleBoxClick = () => {
    // 박스를 클릭한 경우, 원하는 동작을 수행
    const topZindex = openWindowList.reduce((prev, current) => {
      return prev.zIndex > current.zIndex ? prev : current;
    });

    if (topZindex.id !== id) {
      const param = {
        index: openWindowList.findIndex((item) => item.id === id),
        topZindex: topZindex.zIndex + 1,
      };

      dispatch(zIndexChange(param));
    }
  };

  const handleResizeStop = (e, direction, ref, delta, position) => {
    // 모서리를 드래그한 경우 원하는 동작을 수행
    setTransition(false);
    const { width, height } = ref.style;
    const { x, y } = position;
    setSize({ width, height });
    setPosition({ x, y });
  };

  const handleBoxResize = () => {
    setTransition(true);
  };

  const handleResize = (e, direction, ref, delta, position) => {
    // 리사이즈 중에 발생하는 이벤트를 처리
  };

  const closeWindow = () => {
    const index = openWindowList.findIndex((item) => item.id === id);
    dispatch(openWindowListRemove(index));
  };

  const minimizeBt = () => {
    const index = openWindowList.findIndex((item) => item.id === id);
    dispatch(openWindowShowChange(index));
  };

  return (
    <>
      {showComponent && (
        <Rnd
          ref={ref}
          style={{
            position: "absolute",
            zIndex: zIndex,
          }}
          size={size}
          position={position}
          disableDragging={moveMode}
          onDragStop={(e, d) => {
            setTransition(false);
            setPosition({ x: d.x, y: d.y });
          }}
          onDragStart={() => {
            setTransition(true);
          }}
          className={`${styles.window} ${isMinimized ? "" : styles.minimized} ${
            transition ? "" : styles.transition
          }`}
          onResizeStop={handleResizeStop}
          onResizeStart={handleBoxResize}
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
                    {favorites.map((a, i) => (
                      <li key={i}>
                        <span>{a.text}</span>
                      </li>
                    ))}
                  </ul>
                  <div
                    className={`${styles["content-title"]} ${styles.favorites}`}
                  >
                    <span>iCloud</span>
                  </div>
                  <ul className={`${styles["content-list"]}`}>
                    {iCloud.map((a, i) => (
                      <li key={i}>
                        <span>{a.text}</span>
                      </li>
                    ))}
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
                          <FiChevronLeft />
                        </span>

                        <span
                          onMouseEnter={() => {
                            setMoveMode(true);
                          }}
                          onMouseLeave={() => {
                            setMoveMode(false);
                          }}
                        >
                          <FiChevronRight />
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
