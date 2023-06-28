const mockMenu = {
    items: [
      {
        name: "Main",
        icon: "Main.png",
        subMenu: [
          {
            name: "About This Mac",
            action: function () {
              // About This Mac에 대한 동작
            },
          },
          {
            name: "System Preferences",
            action: function () {
              // System Preferences에 대한 동작
            },
          },
          // 추가적인 Apple 서브 메뉴 항목들...
        ],
      },
      {
        name: "Finder",
        icon: "finder.png",
        subMenu: [
          {
            name: "메뉴",
            subMenu: [
              {
                name: "닫기",
                action: 'close'
              },
              {
                name: "최소화",
                action: 'minimize'
              },
            ],
          },
  
          // 추가적인 File 서브 메뉴 항목들...
        ],
      },
      {
        name: "Talk",
        icon: "Talk.png",
        subMenu: [
          {
            name: "메뉴",
            subMenu: [
              {
                name: "닫기",
                action: 'close'
              },
              {
                name: "최소화",
                action: 'minimize'
              },
            ],
          },
  
          // 추가적인 File 서브 메뉴 항목들...
        ],
      },
      // 추가적인 메뉴 항목들...
    ],
  };
  
  export default mockMenu;