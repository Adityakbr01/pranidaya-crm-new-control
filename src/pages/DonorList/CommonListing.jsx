import React from "react";
import NavTabs from "@/components/common/NavTabs";
import { Users, CopyCheck } from "lucide-react";

const CommonListing = () => {
  const tabs = [
    {
      label: "Donor Directory",
      path: "/donor-list",
      icon: Users,
    },
    {
      label: "Duplicate Records",
      path: "/duplicate",
      icon: CopyCheck,
    },
  ];

  return <NavTabs tabs={tabs} />;
};

export default CommonListing;
