import "./App.css";
import Desktop from "./component/desktop/desktop";
import { useState, useEffect } from "react";

import { useDispatch } from "react-redux";
import { change } from "./store";
function App() {
  let dispatch = useDispatch();
  const [winHeight, setHeight] = useState(window.innerHeight); //브라우저 높이

  const handleResize = () => {
    let desktop = document.querySelector(".desktop");
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
