import React from "react";
import NavTabs from "@/components/common/NavTabs";
import { Users, ShoppingCart, IndianRupee, Boxes, Flame, Globe } from "lucide-react";

const DownloadCommon = () => {
  const tabs = [
    {
      label: "Donor",
      path: "/donor",
      icon: Users,
    },
    {
      label: "Purchase",
      path: "/cashpurchase",
      icon: ShoppingCart,
    },
    {
      label: "Donation Receipt",
      path: "/cash",
      icon: IndianRupee,
    },
    {
      label: "Material Receipt",
      path: "/M-recepit",
      icon: Boxes,
    },
    {
      label: "Consumption",
      path: "/D-consumption",
      icon: Flame,
    },
    {
      label: "Website Donation",
      path: "/web-donation",
      icon: Globe,
    },
  ];

  return <NavTabs tabs={tabs} />;
};

export default DownloadCommon;
