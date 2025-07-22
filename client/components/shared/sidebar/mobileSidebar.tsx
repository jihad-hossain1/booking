"use client";

import React from "react";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { NavButton, NavLink } from "./NavLink";
import { TSideProps } from "./types";
import { sideMenus } from "./utils";
import { useSidebar } from "../context/SidebarContext";

export const MobileSidebar = ({ title, handleLogout }: TSideProps) => {
  const { isSidebarOpen, setIsSidebarOpen } = useSidebar();
  const pathname = usePathname();
  return (
    <>
      <button
        onClick={() => setIsSidebarOpen(true)}
        className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <Menu className="h-6 w-6 text-gray-600" />
      </button>

      <div
        className={`fixed inset-0 bg-black/50 transition-opacity duration-300 lg:hidden
          ${isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={() => setIsSidebarOpen(false)}
      />

      <div
        className={`fixed inset-y-0 left-0 w-72 bg-white transform transition-transform duration-300 ease-in-out lg:hidden
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex h-full flex-col">
          <div className="flex h-12 items-center justify-between px-6 border-b mt-16">
            <h1 className="text-sm font-semibold text-gray-900">{title}</h1>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-5 w-5 text-gray-600" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-1">
              {sideMenus?.map((item, index) => (
                <li key={index}>
                  {
                    item.name == "Logout" ? (
                      <NavButton {...item} onClick={handleLogout} isActive={pathname == item?.href} />
                    ) :
                      <NavLink
                        {...item}
                        isActive={pathname === item?.href}
                        onClick={() => setIsSidebarOpen(false)}
                      />}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};
