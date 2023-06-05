import { useState, useEffect } from "react";
import axios from "axios";
import dock from "mock/dock";
import styles from 'style/dock.module.css'
const Dock = () => {
  const [windowList, setWindowList] = useState([]); //열려있는 윈도우
  const [dockList, setDockList] = useState([...dock]);
  const [loding, setLoading] = useState(false);

  function iconClickEvent(text) {
    let copy = [...windowList];
    let index = copy.indexOf(text);
    console.log("index", index);
    if (!index) {
      // copy.splice(index, 1);
      return false;
    } else {
      copy.push(text);
    }
    setWindowList(copy);
  }
  useEffect(() => {
    setLoading(true);
    axios
      .post("http://59.28.90.109:8081/api/doc/selectList")
      .then((response) => {
        const data = [...response.data];
        setDockList(...data);
      })
      .catch((error) => {
        const mockData = [...dock];
        setDockList(mockData);
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []); // 의존성 배열을 빈 배열로 설정하여 한 번만 실행되도록 함

  return (
    <div className={styles.dock}>
      <ul>
        {dockList.map(function (value, i) {
          return (
            <li className={styles.icon} onClick={() => iconClickEvent("아이콘1")} key={i}>
              <span className={styles['sample-icon']}>
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
