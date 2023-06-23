import { useState, useRef, useEffect } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Rnd } from "react-rnd";
import favorites from "mock/favorites";
import iCloud from "mock/icloud";
import styles from "style/Talk.module.css";
import { useSelector, useDispatch } from "react-redux";
import {
  openWindowListRemove,
  openWindowShowChange,
  zIndexChange,
} from "store";

const Talk = (props) => {
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
              {/* 컨텐츠 시작 */}
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
              </div>
              <div className={styles["dim"]}></div>
              <div className={styles["view"]}>
                <div className={styles["left-nav"]}>
                  <ul>
                    <li>
                      <span>메뉴1</span>
                    </li>
                    <li>
                      <span>메뉴2</span>
                    </li>
                  </ul>
                </div>
                <div className={styles["view-content"]}>
                  <div className={styles["user-info"]}>
                    <div className={styles["user-image"]}>
                      <div className={styles["user-image-inner"]}>
                        <div className={styles["image"]}>
                          <img
                            src={`/warwick.png`}
                            width="100%"
                            height="100%"
                          ></img>
                        </div>
                      </div>
                    </div>
                    <div className={styles["user-name"]}>
                      <ul>
                        <li>이름</li>
                        <li>아이디</li>
                      </ul>
                    </div>
                  </div>
                  <div className={styles["readMe"]}>
                    <h1>프로젝트 설명</h1>
                    <p>
                      {" "}
                      소켓통신을 활용해 서버와 실시간 자료를 수집하고 그데이터를
                      기반으로 우리가 일상에서 사용하고있는 메신저 앱을
                      만들었습니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Rnd>
      )}
    </>
  );
};

export default Talk;
