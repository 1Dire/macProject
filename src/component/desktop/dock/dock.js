import { useState } from "react";
const Dock = ()=>{
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
return(
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
)
}
export default Dock