import "./App.css";
import Desktop from "./component/desktop/desktop";
import { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { change } from "./store";
function App() {
  let dispatch = useDispatch();

  let winOverflow = useSelector((state) => {
    return state.winOverflow;
  });

  const [winWidth, setWidth] = useState(window.innerWidth); //브라우저 넓이

  const [winHeight, setHeight] = useState(window.innerHeight); //브라우저 높이

  const handleResize = () => {
    let desktop = document.querySelector(".desktop");

    setWidth(window.innerWidth);
    setHeight(window.innerHeight);

    dispatch(change(winHeight < desktop.offsetHeight ? false : true));
    
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });
  return (
    <div className="App">
      <Desktop></Desktop>
    </div>
  );
}

export default App;
