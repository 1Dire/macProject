import { useState } from "react";
import favorites from "mock/favorites.js"; //즐겨찾기 목업데이터
import iCloud from "mock/icloud"; // iCloud 목업

const Desktop = (props) => {
  const [windowList, setWindowList] = useState([]); //열려있는 윈도우
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
    console.log("전", windowList);
  }

  return (
    <div className={`desktop${props.winOverflow ? "" : " over"}`}>
      <div className="window-box">
        <div className="menu-bar">
          <ul>
            <li>
              <span>아이콘</span>
            </li>
            <li>
              <span>메뉴1</span>
            </li>
            <li>
              <span>메뉴2</span>
            </li>
            <li>
              <span>메뉴3</span>
            </li>
            <li>
              <span>메뉴4</span>
            </li>
            <li>
              <span>메뉴5</span>
            </li>
          </ul>
        </div>
        <div className="window">
          <div className="content">
            {/* {windowList.map(function (a, i) {
              return (
            
              );
            })} */}
            <div className="content-box">
              <div className="content-left" style={{ width: "10%" }}>
                <div className="content-btn-box">
                  <ul>
                    <li>
                      <span class="red-bt"></span>
                    </li>
                    <li>
                      <span class="yellow-bt"></span>
                    </li>
                    <li>
                      <span class="green-bt"></span>
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
          
          <div className="dock">
            <ul>
              <li className="icon" onClick={() => iconClickEvent("아이콘1")}>
                <span className="sample-icon">아이콘1</span>
              </li>
              <li className="icon" onClick={() => iconClickEvent("아이콘2")}>
                <span className="sample-icon">아이콘2</span>
              </li>
              <li className="icon" onClick={() => iconClickEvent("아이콘3")}>
                <span className="sample-icon">아이콘3</span>
              </li>
              <li className="icon" onClick={() => iconClickEvent("아이콘4")}>
                <span className="sample-icon">아이콘4</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Desktop;
