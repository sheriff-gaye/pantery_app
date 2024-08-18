

import { Activity, CreditCard, ListIcon, Package } from "lucide-react";
import DataCard from "./data-card";
import { totalCategories } from "@/actions/get-categories";
import { useEffect, useState } from "react";

const DataCards = () => {

  const [category,setCategory]=useState<any>();

 useEffect(()=>{

  const fetchData=async()=>{
  const  totalCategory= await totalCategories();
  setCategory(totalCategory);
  }

  fetchData()

 },[category])

  return (
    <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
      <DataCard
        title=" Total  Categories"
        icon={ListIcon}
        value={category}
        desc=" +20.1% from last month"
      />

      <DataCard
        title="Total Products"
        icon={Package}
        value={50}
        desc="  +10.1% from last month"
      />

      <DataCard
        title="Expired Product"
        icon={CreditCard}
        value={4}
        desc="+19% from last month"
      />

      <DataCard
        title="Stock Level"
        icon={Activity}
        value={34}
        desc="+201 since last hour"
      />
    </div>
  );
};

export default DataCards;
