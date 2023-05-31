import MenuBar from "component/desktop/menu/menuBar";
import WindowContent from "component/desktop/window/window";
import Dock from "component/desktop/dock/dock";
import { useSelector } from "react-redux";
const Desktop = (props) => {
  let winOverflow = useSelector((state) => {
    return state.winOverflow;
  });

  return (
    <div className={`desktop${winOverflow ? "" : " over"}`}>
      <div className="window-box">
        <MenuBar />
        <div className="window">
          <WindowContent />
          <Dock />
        </div>
      </div>
    </div>
  );
};
export default Desktop;
