import { useState, useRef, useEffect } from "react";
import { Rnd } from "react-rnd";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { BsFillChatDotsFill } from "react-icons/bs";
import styles from "style/Talk.module.css";
import { BiMessageAdd } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
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
    roomName: "user1",
    message: "안녕하세요!",
    timestamp: new Date("2023-06-26T10:00:00.000Z"),
  },
  {
    id: 2,
    roomName: "user2",
    message: "안녕하세요! 어떤 도움이 필요하신가요?",
    timestamp: new Date("2023-06-26T10:01:00.000Z"),
  },
  {
    id: 3,
    roomName: "user3",
    message: "저는 채팅 프로그램을 만드는 중인데 도움이 필요해요.",
    timestamp: new Date("2023-06-26T10:02:00.000Z"),
  },
  {
    id: 4,
    roomName: "user4",
    message: "무엇을 도와드릴까요?",
    timestamp: new Date("2023-06-26T10:03:00.000Z"),
  },
  // 추가적인 채팅 데이터를 원하실 경우 여기에 추가해주세요.
];
const socket = io.connect("http://localhost:3001");
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
  const [menu, setMenu] = useState("info");
  const [message, setMessage] = useState("");

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

  const minimizeBt = () => {
    const index = openWindowList.findIndex((item) => item.id === id);
    dispatch(openWindowShowChange(index));
  };
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
        roomName: value.roomName,
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
                    <li
                      onClick={() => {
                        setMenu("info");
                      }}
                    >
                      <span
                        className={`${menu === "info" ? styles.select : ""}`}
                      >
                        <AiOutlineInfoCircle />
                      </span>
                    </li>
                    <li
                      onClick={() => {
                        setMenu("chat");
                      }}
                    >
                      <span
                        className={`${menu === "chat" ? styles.select : ""}`}
                      >
                        <BsFillChatDotsFill />
                      </span>
                    </li>
                  </ul>
                </div>
                {menu === "info" && (
                  <div className={styles["view-content"]}>
                    <div className={styles["user-info"]}>
                      <div className={styles["user-image"]}>
                        <div className={styles["user-image-inner"]}>
                          <div className={styles["image"]}>
                            <img
                              src={`/talk/Delivery boy-1.png`}
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
                      <h3>Project Overview </h3>
                      <div>
                        <p>
                          My project is a real-time chat application developed
                          using Socket.IO and Express. This application allows
                          users to exchange messages in real-time.
                        </p>
                        <p>
                          By utilizing Express, you have built a web server, and
                          Socket.IO enables bi-directional communication between
                          the client and the server. Users can access the
                          application through a web browser and send/receive
                          messages in real-time.
                        </p>
                        <p>
                          Using event-based communication provided by Socket.IO,
                          whenever a new message is received, it is broadcasted
                          to all connected clients. This allows all users to
                          engage in real-time conversations with each other.
                        </p>
                        <p>
                          Additionally, with Express, you can implement other
                          features and pages within the application. For
                          example, you can incorporate functionalities such as
                          user authentication, chat room creation, or message
                          history.
                        </p>
                        <p>
                          This project serves as an example of integrating
                          Socket.IO and Express to create a real-time chat
                          functionality. Users can experience immediate
                          responses and engage in real-time interactions through
                          this application.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                {menu === "chat" && (
                  <div className={styles["chat"]}>
                    <h2>Chating Room</h2>
                    <ul>
                      {chatData.map((value, i) => (
                        <li
                          key={i}
                          onDoubleClick={() => {
                            chatRoomOpen(value);
                          }}
                        >
                          <div className={styles["chat-img"]}>
                            <div>
                              <img
                                src={`/talk/Delivery boy-1.png`}
                                width="100%"
                                height="100%"
                              ></img>
                            </div>
                          </div>
                          <div className={styles["chat-text"]}>
                            <div
                              className={styles["text-inner"]}
                              id={`chat-${value.id}`}
                            >
                              <span className={styles["roomName"]}>
                                {value.roomName}
                              </span>
                              <span className={styles["timestamp"]}>
                                {value.timestamp.toLocaleString("ko-KR", {
                                  month: "long",
                                  day: "numeric",
                                })}
                              </span>
                            </div>
                            <p className={styles["message"]}>{value.message}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Rnd>
      )}
    </>
  );
};

export default Talk;
