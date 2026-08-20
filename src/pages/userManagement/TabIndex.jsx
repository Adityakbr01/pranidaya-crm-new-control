import React, { useState } from "react";
import PageControl from "@/pages/userManagement/PageControl.jsx";
import ButtonControl from "@/pages/userManagement/ButtonControl.jsx";
import Layout from "@/layout/Layout.jsx";
import { ShieldCheck, ToggleLeft, UserCheck } from "lucide-react";

const TabIndex = () => {
  const [tabValue, setTabValue] = useState(0);

  const tabs = [
    { label: "Page Access Control", icon: ShieldCheck },
    { label: "Action & Button Control", icon: ToggleLeft },
  ];

  return (
    <Layout>
      <div className="py-2">
        {/* Custom Segmented Control Header */}
        <div className="w-full overflow-x-auto no-scrollbar py-2 mb-6">
          <nav
            aria-label="User Management Tabs"
            className="inline-flex p-1.5 bg-slate-100 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 gap-1.5 transition-colors"
          >
            {tabs.map((tab, index) => {
              const isActive = tabValue === index;
              const Icon = tab.icon;
              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => setTabValue(index)}
                  className={`flex items-center justify-center gap-2.5 px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-150 select-none cursor-pointer ${
                    isActive
                      ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-50 border border-slate-200 dark:border-slate-700 shadow-xs font-bold"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 ${
                      isActive ? "text-blue-600 dark:text-blue-400" : "text-slate-400 dark:text-slate-500"
                    }`}
                  />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content Panes */}
        <div className="transition-opacity duration-200">
          {tabValue === 0 && <PageControl />}
          {tabValue === 1 && <ButtonControl />}
        </div>
      </div>
    </Layout>
  );
};

export default TabIndex;
