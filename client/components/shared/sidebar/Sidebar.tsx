"use client";

import React from "react";
import { DesktopSidebar } from "./desktopSidebar";
import { MobileSidebar } from "./mobileSidebar";
// import { signout } from "@/modules/auth/actions/authActions";

const Sidebar = () => {

  const handleLogout = async () => {
    // await signout();
    alert("Logout TODO: Implement logout");
  };

  return (
    <>
      <div className="hidden lg:block">
        <DesktopSidebar handleLogout={handleLogout} title={"AZ-TOOLS"} />
      </div>
      <div className="block lg:hidden">
        <MobileSidebar handleLogout={handleLogout} title={"AZ-TOOLS"} />
      </div>
    </>
  );
};

export default Sidebar;
