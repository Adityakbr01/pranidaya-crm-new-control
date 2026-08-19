import React from "react";
import NavTabs from "@/components/common/NavTabs";
import { ShoppingCart, Flame, Layers } from "lucide-react";

const DeliveryFilter = () => {
  const tabs = [
    {
      label: "Purchases",
      path: "/purchase",
      icon: ShoppingCart,
    },
    {
      label: "Consumption",
      path: "/consumption",
      icon: Flame,
    },
    {
      label: "Stock Summary",
      path: "/stock",
      icon: Layers,
    },
  ];

  return <NavTabs tabs={tabs} />;
};

export default DeliveryFilter;
