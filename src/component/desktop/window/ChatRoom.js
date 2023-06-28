import { useState, useRef, useEffect } from "react";
import { Rnd } from "react-rnd";
import styles from "style/ChatRoom.module.css";
import { AiOutlineMenu } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { HiOutlineUserGroup } from "react-icons/hi";
import {
  openWindowListRemove,
  openWindowShowChange,
  zIndexChange,
  openWindowListAdd,
} from "store";
import io from "socket.io-client";

const chatData = [
  {
    id: 1,
    sender: "user1",
    message: "안녕하세요!",
    timestamp: new Date("2023-06-26T10:00:00.000Z"),
  },
  {
    id: 2,
    sender: "user2",
    message: "안녕하세요! 어떤 도움이 필요하신가요?",
    timestamp: new Date("2023-06-26T10:01:00.000Z"),
  },
  {
    id: 3,
    sender: "user3",
    message: "저는 채팅 프로그램을 만드는 중인데 도움이 필요해요.",
    timestamp: new Date("2023-06-26T10:02:00.000Z"),
  },
  {
    id: 4,
    sender: "user4",
    message: "무엇을 도와드릴까요?",
    timestamp: new Date("2023-06-26T10:03:00.000Z"),
  },
  // 추가적인 채팅 데이터를 원하실 경우 여기에 추가해주세요.
];
const socket = io.connect("http://localhost:3001");
const ChatRoom = (props) => {
  const ref = useRef(null);
  const dispatch = useDispatch();

  const openWindowList = useSelector((state) => state.openWindowList);

  const {
    id,
    width,
    height,
    zIndex,
    positionX,
    positionY,
    show,
    roomName,
    roomId,
  } = props;
  const [size, setSize] = useState({ width, height });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isMinimized, setIsMinimized] = useState(show);
  const [moveMode, setMoveMode] = useState(true);
  const [showComponent, setShowComponent] = useState(false);
  const [transition, setTransition] = useState(false);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      alert(data.message);
    });
  }, [socket]);
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

  // const minimizeBt = () => {
  //   const index = openWindowList.findIndex((item) => item.id === id);
  //   dispatch(openWindowShowChange(index));
  // };
  const sendMessage = () => {
    socket.emit("send_message", { message: "Hello" });
  };
  const chatRoomOpen = (value) => {
    let index = openWindowList.findIndex(
      (item) => item.name === "ChatRoom" && item.roomId === value.id
    );
    if (index < 0) {
      let topId = openWindowList.reduce((prev, current) => {
        return prev.id > current.id ? prev : current;
      });
      let topZindex = openWindowList.reduce((prev, current) => {
        return prev.zIndex > current.zIndex ? prev : current;
      });
      const object = {
        display: "Talk",
        name: "ChatRoom",
        roomId: value.id,
        zIndex: topZindex.zIndex + 1,
        id: topId.id + 1,
        show: true,
      };
      dispatch(openWindowListAdd(object));
    }
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
          minWidth={350}
          minHeight={550}
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
                  </ul>
                </div>
              </div>

              <div className={styles["dim"]}></div>
              <div className={styles["view"]}>
                <div className={styles["roomName"]}>
                  <div className={styles["left"]}>
                    <h2>{roomName}</h2>
                    <p>
                      <span style={{ position: "relative", bottom: "-1px" }}>
                        <HiOutlineUserGroup />
                      </span>
                      <span>12명</span>
                    </p>
                  </div>
                  <div className={styles["right"]}>
                    <AiOutlineMenu />
                  </div>
                </div>
                <div className={styles["chat"]}>
                  <div className={styles["chat-container"]}>
                    <div className={styles["sender"]}>
                      <div className={styles["profile-image"]}>
                        <img
                          src={`/talk/Delivery boy-1.png`}
                          width="100%"
                          height="100%"
                        ></img>
                      </div>
                      <div className={styles["message"]}>
                        <div className={styles["message-info"]}>
                          <div className={styles["name"]}>이름</div>
                          <div className={styles["text"]}><span>내용</span></div>
                        </div>
                        <div className={styles["timestamp"]}>
                          <span>55:55</span>
                        </div>
                      </div>
                      
                    </div>
                  </div>
                  
                </div>
                <div className={styles["chatInput"]}>2</div>
              </div>
            </div>
          </div>
        </Rnd>
      )}
    </>
  );
};

export default ChatRoom;
