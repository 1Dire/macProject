import React from "react";
import styles from "style/menuBar.module.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { focusChange } from "store";
import mockMenu from "mock/menu";
const MenuBar = () => {
  let focusWindow = useSelector((state) => {
    return state.focusWindow;
  }); // 목업 모드
  let openWindowList = useSelector((state) => {
    return state.openWindowList;
  }); // 목업 모드
  let dispatch = useDispatch();
  const [menu, setMenu] = useState(null);

  const handleMenuAction = (actionType) => {
    console.log("actionType", actionType);
  };
  useEffect(() => {
    if (focusWindow) {
      let selectMenu = mockMenu.items.find(function (obj) {
        return obj.name === focusWindow.name;
      });
      setMenu(selectMenu);
    } else {
      setMenu(null);
    }
  }, [focusWindow]);
  useEffect(() => {
    let find = openWindowList.find((item) => item.show === true);
    if (openWindowList.length === 0 || find === undefined) {
      dispatch(focusChange(null));
    }

    // if(!openWindowList.find(item => item.show === true)){

    //   setMenu({})
    // }
  }, [openWindowList]);
  return (
    <div className={styles["menu-bar"]}>
      <ul>
        <li>
          <span>애플</span>
        </li>
        {menu && (
          <>
            <li>
              <span>{menu.name}</span>
              {menu.subMenu &&
                menu.subMenu.map(function (value, i) {
                  return (
                    <React.Fragment key={i}>
                      <span>{value.name}</span>
                      {value.subMenu && (
                        <ul key={`list-${i}`}>
                          {value.subMenu.map(function (value, j) {
                            return (
                              <React.Fragment key={j}>
                                <li
                                  onClick={() => handleMenuAction(value.action)}
                                >
                                  {value.name}
                                </li>
                              </React.Fragment>
                            );
                          })}
                        </ul>
                      )}
                    </React.Fragment>
                  );
                })}
            </li>
           
          </>
        )}
      </ul>
    </div>
  );
};

export default MenuBar;
