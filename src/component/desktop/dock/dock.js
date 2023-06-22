import { useState, useEffect } from "react";
import axios from "axios";
import dock from "mock/dock";
import styles from "style/dock.module.css";
import { useSelector, useDispatch } from "react-redux";
import {
  openWindowListAdd,
  openWindowListRemove,
  openWindowShowChange,
  focusChange,
} from "store";
const Dock = () => {
  let mockMode = useSelector((state) => {
    return state.mockMode;
  }); // 목업 모드
  let openWindowList = useSelector((state) => {
    return state.openWindowList;
  });

  let dispatch = useDispatch();

  const [dockList, setDockList] = useState([...dock]);
  const [loding, setLoading] = useState(false);

  function iconClickEvent(value) {
    console.log('value',value)
    let object = { ...value };
    let index = openWindowList.findIndex((item) => item.name === object.name);
    if (index < 0) {
      //배열내 이미존재하면
      object.id = openWindowList.length + 1;
      object.show = true;
      if (openWindowList.length === 0) {
        object.zIndex = 1;
      } else {
        let topZindex = openWindowList.reduce((prev, current) => {
          return prev.zIndex > current.zIndex ? prev : current;
        });
        object.zIndex = topZindex.zIndex + 1;
      }
      console.log('object',object)
      dispatch(openWindowListAdd(object));
    } else {
      dispatch(openWindowShowChange(index));
    }
  }
  useEffect(() => {
    //axios
    if (mockMode) {
      const mockData = [...dock];
      setDockList(mockData);
    } else {
      setLoading(true);
      axios
        .post("http://59.28.90.109:8081/api/doc/selectList")
        .then((response) => {
          const data = [...response.data];
          setDockList(...data);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, []); // 의존성 배열을 빈 배열로 설정하여 한 번만 실행되도록 함
  useEffect(() => {
    if (openWindowList.length > 0) {
      if (openWindowList.find((item) => item.show === true)) {
        let focus = openWindowList.reduce(
          (prev, current) => {
            return prev.zIndex > current.zIndex ? prev : current;
          },
          { zIndex: null }
        ); // 초기 값으로 { zIndex: -Infinity }를 제공
        dispatch(focusChange(focus));
      } else {
        dispatch(focusChange({}));
      }
    }
  }, [openWindowList]);
  return (
    <div className={styles.dock}>
      <ul>
        {dockList.map(function (value, i) {
          return (
            <li
              className={styles.icon}
              onClick={() => iconClickEvent(value)}
              key={i}
            >
              <span className={styles["sample-icon"]}>
                <img
                  src={`/icon/${value.file_name}.png`}
                  width="100%"
                  height="100%"
                ></img>
              </span>
            </li>
          );
        })}
        <li
          onClick={() => {
            console.log(openWindowList);
          }}
        >
          bt
        </li>
      </ul>
    </div>
  );
};
export default Dock;
