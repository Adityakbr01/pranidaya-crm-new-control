import React from "react";
import NavTabs from "@/components/common/NavTabs";
import { IndianRupee, Boxes } from "lucide-react";

const RequestFilter = () => {
  const tabs = [
    {
      label: "Donation Receipts",
      path: "/cashrecepit",
      icon: IndianRupee,
    },
    {
      label: "Material Receipts",
      path: "/recepit-material",
      icon: Boxes,
    },
  ];

  return <NavTabs tabs={tabs} />;
};

export default RequestFilter;
