import React from "react";
import NavTabs from "@/components/common/NavTabs";
import { BarChart3, PieChart } from "lucide-react";

const TaskManagerFilter = () => {
  const tabs = [
    {
      label: "Stock Summary (Kgs)",
      path: "/stock-summary",
      icon: BarChart3,
    },
    {
      label: "Donation Summary",
      path: "/d-summary",
      icon: PieChart,
    },
  ];

  return <NavTabs tabs={tabs} />;
};

export default TaskManagerFilter;
