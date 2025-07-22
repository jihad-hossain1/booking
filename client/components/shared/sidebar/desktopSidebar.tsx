"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { NavButton, NavLink } from "./NavLink";
import { TSideProps } from "./types";
import { sideMenus } from "./utils";

export const DesktopSidebar = ({ title, handleLogout }: TSideProps) => {
  const pathname = usePathname();
  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-72 lg:flex-col">
      <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
        <div className="flex h-16 shrink-0 items-center">
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        </div>
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" className="-mx-2 space-y-1">
                {sideMenus?.map((item, index) => (
                  <li key={index}>
                    {
                      item.name == "Logout" ? (
                        <NavButton {...item} onClick={handleLogout} isActive={pathname == item?.href} />
                      ) :
                        <NavLink {...item} isActive={pathname == item?.href} />
                    }
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};
