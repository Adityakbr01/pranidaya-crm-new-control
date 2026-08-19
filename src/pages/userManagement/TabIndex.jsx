import React, { useState } from "react";
import PageControl from "@/pages/userManagement/PageControl.jsx";
import ButtonControl from "@/pages/userManagement/ButtonControl.jsx";
import Layout from "@/layout/Layout.jsx";
import { FileText, ToggleLeft } from "lucide-react";

const TabIndex = () => {
  const [tabValue, setTabValue] = useState(0);

  const tabs = [
    { label: "Page Access Control", icon: FileText },
    { label: "Action & Button Control", icon: ToggleLeft },
  ];

  return (
    <Layout>
      <div className="container mx-auto p-4 sm:p-6">
        {/* Custom Segmented Control Header */}
        <div className="w-full overflow-x-auto no-scrollbar py-2 mb-6">
          <nav
            aria-label="User Management Tabs"
            className="inline-flex p-1.5 bg-slate-200/80 backdrop-blur-md rounded-2xl border border-slate-300/60 shadow-inner gap-1.5"
          >
            {tabs.map((tab, index) => {
              const isActive = tabValue === index;
              const Icon = tab.icon;
              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => setTabValue(index)}
                  className={`flex items-center justify-center gap-2.5 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 select-none ${
                    isActive
                      ? "bg-white text-slate-900 shadow-md shadow-slate-900/5 ring-1 ring-slate-900/10 font-bold"
                      : "text-slate-600 hover:text-slate-900 hover:bg-white/60 active:scale-[0.98]"
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 ${
                      isActive ? "text-blue-600" : "text-slate-400"
                    }`}
                  />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content Panes */}
        <div className="mt-2 transition-opacity duration-200">
          {tabValue === 0 && <PageControl />}
          {tabValue === 1 && <ButtonControl />}
        </div>
      </div>
    </Layout>
  );
};

export default TabIndex;
