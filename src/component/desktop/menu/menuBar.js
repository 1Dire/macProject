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
  const menuOpen = (clickMenu) => {
    console.log("click", clickMenu);
    let copy = { ...menu };
    copy.subMenu.forEach((element) => {
      if (element.name === clickMenu.name) {
        element.show = !element.show;
      }
    });
    console.log("copy", copy);
    setMenu(copy);
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
            <li className={styles["menu"]}>
              <div className={styles["menu-title"]}>
                <span>{menu.name}</span>
              </div>

              {menu.subMenu &&
                menu.subMenu.map(function (value, i) {
                  return (
                    <div
                      key={i}
                      id={`menu-${i + 1}`}
                      className={styles["subMenu"]}
                    >
                      <div
                        onClick={() => {
                          menuOpen(value);
                        }}
                        className={styles["sub-title"]}
                      >
                        <span>{value.name}</span>
                      </div>
                      {value.subMenu && (
                        <ul
                          key={`list-${i}`}
                          className={value.show ? `${styles.open}` : ""}
                        >
                          {value.subMenu.map(function (value, j) {
                            return (
                              <li
                                key={j}
                                onClick={() => handleMenuAction(value.action)}
                              >
                                {value.name}
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </div>
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
