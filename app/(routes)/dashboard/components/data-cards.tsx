"use client";

import { Activity, CreditCard, ListIcon, Package } from "lucide-react";
import DataCard from "./data-card";
import { totalCategories } from "@/actions/categories";
import { allPantries, allPantriesNum, getTotalPantryQuantity, totalExpiredPantries } from "@/actions/pantries";
import { useAuth } from "@/hooks/auth";
import { useEffect, useState } from "react";

const DataCards = () => {
  const [category, setCategory] = useState<number>(0);
  const [qty, setQty] = useState<number>(0);
  const [product, setProduct] = useState<number>(0);
  const [expired, setExpired] = useState<number>(0);
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      if (user?.uid) {
        try {
          const totalCategory = await totalCategories();
          const totalProducts= await allPantriesNum(user?.uid);
          const totalQty = await getTotalPantryQuantity(user?.uid);
          const expiredProducts = await totalExpiredPantries(user?.uid);

         
          console.log('Fetched Data:', {
            totalCategory,
            totalProducts,
            totalQty,
            expiredProducts
          });

        
          setCategory(Number(totalCategory));
          setProduct(Number(totalProducts));
          setQty(Number(totalQty));
          setExpired(Number(expiredProducts));
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();
  }, [user]);

  return (
    <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
      <DataCard
        title="Total Categories"
        icon={ListIcon}
        value={category}
        desc="+20.1% from last month"
      />

      <DataCard
        title="Total Products"
        icon={Package}
        value={product}
        desc="+10.1% from last month"
      />

      <DataCard
        title="Expired Products"
        icon={CreditCard}
        value={expired}
        desc="+19% from last month"
      />

      <DataCard
        title="Stock Level"
        icon={Activity}
        value={qty}
        desc="+201 since last hour"
      />
    </div>
  );
};

export default DataCards;