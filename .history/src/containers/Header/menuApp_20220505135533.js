export const adminMenu = [
    {
        //hệ thống
        name: "menu.system.SideBar",
        icon: <i class="fas fa-house"></i>,
        menus: [
            {
                name: "menu.system.system-administrator.user-manage",
                link: "/system/user-manage",
            },
            {
                name: "menu.system.system-administrator.movie-manage",
                link: "/system/movie-manage",
            },
        ],
    },

    {
        name: "menu.system.system-administrator.movie-manage",
        link: "/system/movie-manage",
    },
    {
        name: "menu.system.SideBar",
        icon: <i class="fas fa-calendar-days"></i>,
        menus: [
            {
                name: "menu.system.system-administrator.movie-manage",
                link: "/system/movie-manage",
            },
        ],
    },
];
