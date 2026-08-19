import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Layers,
  Boxes,
  HeartHandshake,
  Receipt,
  Globe,
  BarChart3,
  Download,
  PawPrint,
  UserCog,
  X,
  ShieldCheck,
} from "lucide-react";
import image from "@/assets/logo.jpg";

const SideNav = ({ openSideNav, setOpenSideNav }) => {
  const sidenavRef = useRef(null);
  const { pathname } = useLocation();
  const [hoveredPath, setHoveredPath] = useState(null);

  const isMenuItemAllowed = (url) => {
    try {
      const pageControl = JSON.parse(
        localStorage.getItem("pageControl") || "[]"
      );
      const userTypeId = localStorage.getItem("user_type_id");

      const routeData = pageControl.find((route) => route.url === url);
      if (!routeData) return false;

      const allowedUsers = routeData.usertype
        .split(",")
        .map((id) => id.trim());
      return allowedUsers.includes(userTypeId) && routeData.status === "Active";
    } catch {
      return true;
    }
  };

  // Menu items with consistent Lucide icons
  const menuItems = [
    { path: "/home", icon: LayoutDashboard, label: "Dashboard" },
    { path: "/master-list", icon: Layers, label: "Master" },
    { path: "/purchase", icon: Boxes, label: "Stock" },
    { path: "/donor-list", icon: HeartHandshake, label: "Donor" },
    { path: "/cashrecepit", icon: Receipt, label: "Receipts" },
    { path: "/webdonation", icon: Globe, label: "Website Donation" },
    { path: "/stock-summary", icon: BarChart3, label: "Reports" },
    { path: "/donor", icon: Download, label: "Downloads" },
    { path: "/animalStock", icon: PawPrint, label: "Animal Stock" },
    { path: "/userManagement", icon: UserCog, label: "User Management" },
  ];

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    function handleClickOutside(e) {
      if (sidenavRef.current && !sidenavRef.current.contains(e.target)) {
        setOpenSideNav(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setOpenSideNav]);

  // Close sidebar on route change
  useEffect(() => {
    setOpenSideNav(false);
  }, [pathname, setOpenSideNav]);

  const username =
    localStorage.getItem("full_name") ||
    localStorage.getItem("username") ||
    "Admin";
  const userRole = localStorage.getItem("role_name") || "Verified Session";

  return (
    <aside
      ref={sidenavRef}
      className={`fixed inset-y-0 left-0 z-50 my-3 ml-3 h-[calc(100vh-24px)] w-64 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col transition-all duration-300 ease-in-out xl:translate-x-0 ${
        openSideNav ? "translate-x-0" : "-translate-x-[110%]"
      }`}
    >
      {/* Brand Header */}
      <div className="relative p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <Link to="/home" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-1 flex items-center justify-center overflow-hidden">
            <img
              src={image}
              alt="Pranidaya Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-tight text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              Pranidaya CRM
            </span>
            <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
              Control Panel v2.0
            </span>
          </div>
        </Link>

        {/* Mobile Close Action */}
        <button
          type="button"
          onClick={() => setOpenSideNav(false)}
          className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 xl:hidden transition-colors cursor-pointer"
          aria-label="Close Sidebar"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation Links with Framer Motion Cursor Follow & Active Pill */}
      <div
        className="flex-1 overflow-y-auto px-3 py-4 space-y-1.5 custom-scrollbar"
        onMouseLeave={() => setHoveredPath(null)}
      >
        <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
          Main Navigation
        </div>
        <ul className="space-y-1 relative">
          {menuItems.map((item) => {
            if (!isMenuItemAllowed(item.path)) return null;
            const isActive = pathname === item.path;
            const isHovered = hoveredPath === item.path;

            return (
              <li
                key={item.path}
                className="relative"
                onMouseEnter={() => setHoveredPath(item.path)}
              >
                {/* Cursor Hover Pill Follower */}
                {isHovered && !isActive && (
                  <motion.div
                    layoutId="hoverSideNavIndicator"
                    className="absolute inset-0 rounded-xl bg-slate-100 dark:bg-slate-800/70"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 30,
                    }}
                  />
                )}

                {/* Active Solid Filled Pill with Spring Layout Animation */}
                {isActive && (
                  <motion.div
                    layoutId="activeSideNavIndicator"
                    className="absolute inset-0 rounded-xl bg-blue-600 dark:bg-blue-600"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30,
                    }}
                  />
                )}

                <NavLink
                  to={item.path}
                  className={`relative z-10 flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold select-none transition-colors duration-150 ${
                    isActive
                      ? "text-white font-bold"
                      : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  <item.icon
                    className={`w-4 h-4 transition-colors ${
                      isActive ? "text-white" : "text-slate-400 dark:text-slate-400"
                    }`}
                  />
                  <span className="truncate">{item.label}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Bottom Profile / System Tag */}
      <div className="p-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/60 rounded-b-2xl">
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
          <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 flex items-center justify-center text-blue-700 dark:text-blue-300 font-bold text-xs">
            {username.charAt(0).toUpperCase()}
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">
              {username}
            </span>
            <div className="flex items-center gap-1 text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
              <ShieldCheck className="w-3 h-3" />
              <span>{userRole}</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SideNav;
