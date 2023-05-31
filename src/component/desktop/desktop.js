import MenuBar from "component/desktop/menu/menuBar";
import WindowContent from "component/desktop/window/window";
import Dock from "component/desktop/dock/dock";
const Desktop = (props) => {
  return (
    <div className={`desktop${props.winOverflow ? "" : " over"}`}>
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
