import { useState, useEffect } from "react";
import axios from "axios";
import dock from "mock/dock";
import styles from "style/dock.module.css";
import { useSelector, useDispatch } from "react-redux";
import { openWindowListAdd, openWindowListRemove } from "store";
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
    let index = openWindowList.indexOf(value);
    if (index) {
      //배열내 이미존재하면
      dispatch(openWindowListAdd(value));
    } else {
      dispatch(openWindowListRemove(index));
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
      </ul>
    </div>
  );
};
export default Dock;
