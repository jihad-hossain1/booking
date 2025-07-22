"use client";

import React from 'react';
import { Bell, Search, User, Menu, Settings, LogOut } from 'lucide-react';
import { useSidebar } from '../context/SidebarContext';
import { DropdownMenu } from '@/components/ui/dropdown/DropdownMenu';
// import { signout } from '@/modules/auth/actions/authActions';

export const TopBar = () => {
  const { isSidebarOpen, setIsSidebarOpen } = useSidebar();

  const handleLogout = async () => {
    // await signout();
    alert('Logout TODO: Implement logout');
  };
  
  return (
    <div className="bg-white border-b border-gray-200 h-16 fixed right-0 left-0 top-0 z-30 lg:left-72 shadow-sm">
      <div className="px-4 h-full flex items-center justify-between">
        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="lg:hidden p-2 -ml-2 hover:bg-gray-100 rounded-lg transition-all duration-200"
        >
          <Menu className="h-5 w-5 text-gray-600" />
        </button>

        {/* Search Bar */}
        <div className="flex-1 max-w-xl ml-4 lg:ml-0 hidden md:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 hover:bg-white transition-colors"
            />
          </div>
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center gap-4">
          <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-all duration-200 hover:scale-105">
            <Bell className="h-5 w-5 text-gray-600" />
            <span className="absolute top-1 right-1 h-2.5 w-2.5 bg-red-500 rounded-full ring-2 ring-white"></span>
          </button>
          
          <DropdownMenu
            trigger={
              <button className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-all duration-200 hover:scale-105">
                <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                  <User className="h-5 w-5 text-gray-600" />
                </div>
                <span className="text-sm font-medium text-gray-700 hidden sm:block">Profile</span>
              </button>
            }
            items={[
              {
                icon: <User className="h-4 w-4" />,
                label: 'My Profile',
                onClick: () => console.log('Profile clicked')
              },
              {
                icon: <Settings className="h-4 w-4" />,
                label: 'Settings',
                onClick: () => console.log('Settings clicked')
              },
              {
                icon: <LogOut className="h-4 w-4" />,
                label: 'Sign Out',
                onClick: () => handleLogout()
              }
            ]}
          />
        </div>
      </div>
    </div>
  );
};
