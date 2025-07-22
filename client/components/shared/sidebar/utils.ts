import { LayoutDashboard, LogOut } from "lucide-react";

export const sideMenus = [
    {
        name: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
        isSubMenu: false,
        subMenu: [],
    },

    { name: "Logout", href: "#", icon: LogOut, isSubMenu: false, subMenu: [] },
];
