import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, Laptop } from "lucide-react";
import { Tooltip } from "@mui/material";

const ThemeToggle = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 animate-pulse" />
    );
  }

  const isDark = resolvedTheme === "dark";

  const toggleTheme = () => {
    if (theme === "system") {
      setTheme(isDark ? "light" : "dark");
    } else if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("system");
    }
  };

  return (
    <Tooltip
      title={
        theme === "system"
          ? `System Mode (${isDark ? "Dark" : "Light"})`
          : isDark
          ? "Dark Mode"
          : "Light Mode"
      }
      arrow
    >
      <button
        type="button"
        onClick={toggleTheme}
        className="relative flex items-center justify-center w-8 h-8 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-750 hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-200 cursor-pointer active:scale-95 shadow-xs"
        aria-label="Toggle light, dark, and system theme"
      >
        {theme === "system" ? (
          <Laptop className="w-4 h-4 text-blue-500 transition-transform duration-200" />
        ) : isDark ? (
          <Moon className="w-4 h-4 text-amber-400 transition-transform duration-200" />
        ) : (
          <Sun className="w-4 h-4 text-amber-500 transition-transform duration-200" />
        )}
      </button>
    </Tooltip>
  );
};

export default ThemeToggle;
