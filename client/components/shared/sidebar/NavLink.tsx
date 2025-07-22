import React, { useState } from "react";
import Link from "next/link";
import { LucideIcon, ChevronRight } from "lucide-react";
import { cn } from "@/utils/cn";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

interface NavLinkProps {
  href?: string;
  icon: LucideIcon;
  name: string;
  isActive: boolean;
  onClick?: () => void;
  isSubMenu?: boolean;
  subMenu?: { name: string; href: string; icon: LucideIcon }[];
}

export const NavLink = ({
  href,
  icon: Icon,
  name,
  isActive,
  onClick,
  isSubMenu,
  subMenu,
}: NavLinkProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathName = usePathname()

  if (isSubMenu && subMenu) {
    return (
      <div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "w-full group flex items-center justify-between rounded-md p-2 text-sm font-semibold leading-6 transition-all duration-200 ease-in-out",
            isActive
              ? "bg-gray-50 text-blue-600"
              : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
          )}
        >
          <div className="flex items-center gap-x-3">
            <Icon
              className={cn(
                "h-5 w-5 shrink-0 transition-colors duration-200",
                isActive
                  ? "text-blue-600"
                  : "text-gray-400 group-hover:text-blue-600"
              )}
            />
            {name}
          </div>
          <motion.div
            initial={false}
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronRight className="h-4 w-4" />
          </motion.div>
        </button>
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ 
                opacity: 1, 
                height: "auto",
                transition: {
                  height: {
                    duration: 0.3,
                    ease: "easeOut"
                  },
                  opacity: {
                    duration: 0.2,
                    ease: "easeIn"
                  }
                }
              }}
              exit={{ 
                opacity: 0, 
                height: 0,
                transition: {
                  height: {
                    duration: 0.2,
                    ease: "easeIn"
                  },
                  opacity: {
                    duration: 0.1
                  }
                }
              }}
              className="pl-4 overflow-hidden"
            >
              <div className="mt-1 space-y-1">
                {subMenu.map((item, index) => {
                  const SubIcon = item.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ x: -10, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        href={item.href}
                        className={cn(
                          "group flex items-center gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 transition-all duration-200 ease-in-out",
                          item.href == pathName
                            ? "bg-gray-50 text-blue-600"
                            : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                        )}
                      >
                        <SubIcon
                          className={cn(
                            "h-4 w-4 shrink-0 transition-colors duration-200",
                            item.href == pathName
                              ? "text-blue-600"
                              : "text-gray-400 group-hover:text-blue-600"
                          )}
                        />
                        {item.name}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
  return (
    <Link
      href={href || "#"}
      onClick={onClick}
      className={`
        group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6
        transition-all duration-200 ease-in-out
        ${isActive
          ? "bg-gray-50 text-blue-600"
          : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
        }
      `}
    >
      <Icon
        className={`h-5 w-5 shrink-0 transition-colors duration-200
          ${isActive
            ? "text-blue-600"
            : "text-gray-400 group-hover:text-blue-600"
          }
        `}
      />
      {name}
    </Link>
  );
};

export const NavButton = ({
  icon: Icon,
  name,
  isActive,
  onClick,
}: NavLinkProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(`
        group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6
        transition-all duration-200 ease-in-out
      `, isActive
        ? "bg-gray-50 text-blue-600"
        : "text-gray-700 hover:bg-gray-50 hover:text-blue-600")}
    >
      <Icon
        className={cn(`h-5 w-5 shrink-0 transition-colors duration-200`, isActive
          ? "text-blue-600"
          : "text-gray-400 group-hover:text-blue-600")}
      />
      {name}
    </button>
  );
};
