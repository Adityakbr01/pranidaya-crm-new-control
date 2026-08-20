import React from "react";
import NavTabs from "@/components/common/NavTabs";
import { Tag, Sparkles, Utensils, HeartCrack, Layers } from "lucide-react";

const AnimalStockFilter = () => {
  const tabs = [
    {
      label: "Animal Types",
      path: "/animalStock",
      icon: Tag,
    },
    {
      label: "Born & Arrivals",
      path: "/animal-born-arrival",
      icon: Sparkles,
    },
    {
      label: "Provisions & Feeds",
      path: "/animal-meet",
      icon: Utensils,
    },
    {
      label: "Mortality & Given",
      path: "/animal-dead",
      icon: HeartCrack,
    },
    {
      label: "Cattle Stock Census",
      path: "/animal-stock",
      icon: Layers,
    },
  ];

  return <NavTabs tabs={tabs} />;
};

export default AnimalStockFilter;
