export const adminMenu = [
    {
        //hệ thống
        name: "menu.system.SideBar",
        menus: [
            {
                name: "menu.system.system-administrator.SideBar",
                subMenus: [
                    {
                        name: "menu.system.system-administrator.user-manage",
                        link: "/system/user-manage",
                    },
                    {
                        name: "menu.system.system-administrator.product-manage",
                        link: "/system/product-manage",
                    },
                    {
                        name: "menu.system.system-administrator.register-package-group-or-account",
                        link: "/system/register-package-group-or-account",
                    },
                ],
            },
            // { name: 'menu.system.system-parameter.SideBar', link: '/system/system-parameter' },
        ],
    },
];
