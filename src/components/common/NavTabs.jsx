import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

/**
 * Clean NavTabs component with smooth Framer Motion active & hover glide.
 *
 * @param {Array} tabs - Array of { label, path, icon?: Component, count?: number|string }
 */
const NavTabs = ({ tabs = [], className = "" }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [hoveredTab, setHoveredTab] = useState(null);

  return (
    <div className={`w-full overflow-x-auto no-scrollbar py-2 mt-4 mb-6 ${className}`}>
      <nav
        aria-label="Domain Tabs"
        onMouseLeave={() => setHoveredTab(null)}
        className="inline-flex min-w-full sm:min-w-0 p-1.5 bg-slate-100 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 gap-1.5 relative transition-colors"
      >
        {tabs.map((tab, index) => {
          const isActive =
            location.pathname === tab.path ||
            (tab.exact === false && location.pathname.startsWith(tab.path));
          const isHovered = hoveredTab === (tab.path || index);
          const Icon = tab.icon;

          return (
            <button
              key={tab.path || index}
              type="button"
              onMouseEnter={() => setHoveredTab(tab.path || index)}
              onClick={() => navigate(tab.path)}
              className={`relative flex-1 min-w-max flex items-center justify-center gap-2 px-4 sm:px-5 py-2 rounded-lg text-xs sm:text-sm font-semibold select-none transition-colors duration-150 cursor-pointer ${
                isActive
                  ? "text-slate-900 dark:text-slate-50 font-bold"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
              }`}
            >
              {/* Cursor Hover Indicator */}
              {isHovered && !isActive && (
                <motion.div
                  layoutId="hoverTabIndicator"
                  className="absolute inset-0 rounded-lg bg-slate-200/60 dark:bg-slate-800/60"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: "spring", stiffness: 450, damping: 35 }}
                />
              )}

              {/* Active Tab Background */}
              {isActive && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute inset-0 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}

              <span className="relative z-10 flex items-center gap-2">
                {Icon && (
                  <Icon
                    className={`w-4 h-4 transition-colors ${
                      isActive ? "text-blue-600 dark:text-blue-400" : "text-slate-400 dark:text-slate-500"
                    }`}
                  />
                )}
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span
                    className={`ml-1 text-[11px] px-2 py-0.5 rounded-full font-medium ${
                      isActive
                        ? "bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800"
                        : "bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default NavTabs;
