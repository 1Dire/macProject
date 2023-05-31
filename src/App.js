import "./App.css";
import Desktop from "./component/desktop/desktop";
import { useState } from "react";
import { useEffect } from "react";

function App() {
  const [winWidth, setWidth] = useState(window.innerWidth); //브라우저 넓이

  const [winHeight, setHeight] = useState(window.innerHeight); //브라우저 높이
  const [winOverflow, setWinOverflow] = useState(false); //오버플로우 체크

  const handleResize = () => {
    let desktop = document.querySelector(".desktop");

    setWidth(window.innerWidth);
    setHeight(window.innerHeight);

    setWinOverflow(winHeight < desktop.offsetHeight ? false : true);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });
  return (
    <div className="App">
      <Desktop winOverflow={winOverflow}></Desktop>
    </div>
  );
}

export default App;
