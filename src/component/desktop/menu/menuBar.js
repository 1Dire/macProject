import React, { useState, useEffect } from "react";
import styles from "style/menuBar.module.css";
import { useSelector, useDispatch } from "react-redux";
import { focusChange, openWindowListRemove, openWindowShowChange } from "store";
import mockMenu from "mock/menu";

const MenuBar = () => {
  const focusWindow = useSelector((state) => state.focusWindow);
  const openWindowList = useSelector((state) => state.openWindowList);
  const dispatch = useDispatch();
  const [menu, setMenu] = useState(null);

  const handleMenuAction = (sub, value) => {
    const index = openWindowList.findIndex(
      (item) => item.name === focusWindow.name
    );

    if (sub.action === "close") {
      dispatch(openWindowListRemove(index));
    }
    if (sub.action === "minimize") {
      dispatch(openWindowShowChange(index));
    }

    const copy = { ...menu };
    copy.subMenu.forEach((element) => {
      if (element.name === value.name) {
        element.show = false;
      }
    });
    setMenu(copy);
  };

  const menuOpen = (clickMenu) => {
    const copy = { ...menu };
    copy.subMenu.forEach((element) => {
      if (element.name === clickMenu.name) {
        element.show = !element.show;
      }
    });
    setMenu(copy);
  };

  useEffect(() => {
    if (focusWindow) {
      const selectMenu = mockMenu.items.find(
        (obj) => obj.name === focusWindow.name
      );
      setMenu(selectMenu);
    } else {
      setMenu(null);
    }
  }, [focusWindow]);

  useEffect(() => {
    const find = openWindowList.find((item) => item.show === true);
    if (openWindowList.length === 0 || find === undefined) {
      dispatch(focusChange(null));
      if (menu) {
        menu.subMenu.forEach((element) => {
          element.show = false;
        });
      }
    }
  }, [openWindowList]);
  useEffect(() => {}, [menu]);
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
                menu.subMenu.map((value, i) => {
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
                          className={value.show ? styles.open : ""}
                        >
                          {value.subMenu.map((sub, j) => {
                            return (
                              <li
                                key={j}
                                onClick={() => handleMenuAction(sub, value)}
                              >
                                {sub.name}
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
