import React from "react";
import NavTabs from "@/components/common/NavTabs";
import { Package, Users, CalendarDays } from "lucide-react";

const EnquiryFilter = () => {
  const tabs = [
    {
      label: "Items Master",
      path: "/master-list",
      icon: Package,
    },
    {
      label: "Vendors List",
      path: "/VendorList",
      icon: Users,
    },
    {
      label: "Occasions",
      path: "/occasion",
      icon: CalendarDays,
    },
  ];

  return <NavTabs tabs={tabs} />;
};

export default EnquiryFilter;
