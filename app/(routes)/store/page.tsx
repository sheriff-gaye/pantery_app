"use client"

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import PantryCard from "./components/pantry";
import usePantryModal from "@/hooks/usePantryModal";
import PantrySkeleton from "./components/skeleton";
import useConfirmModal from "@/hooks/useConfirmModal";
import { getUserLocation } from "@/lib/lat";
import { allPantries, PantryItem } from "@/actions/pantries";
import { useAuth } from "@/hooks/auth";
import { Skeleton } from "@/components/ui/skeleton";
import { chatSession } from "./components/ai";
import useReceipeModal from "@/hooks/useConfirmModal";

const Store = () => {
  const pantryModal = usePantryModal();
  const receipemModel = useReceipeModal();
  const [loading, setLoading] = useState(true);
  const [userLocation, setUserLocation] = useState<string | any>(null);
  const [pantries, setPantries] = useState<PantryItem[]>([]);
  const { user } = useAuth();


  useEffect(() => {
    const userId = user?.uid;


    const fetchPantries = async () => {
      try {
        const data: any = await allPantries(userId!);
        setPantries(data);
      } catch (error) {
        console.error("Error fetching pantries:", error);
      }
    };

    const fetchUserLocation = async () => {
      try {
        const location = await getUserLocation();
        setUserLocation(location);
      } catch (error) {
        console.error("Error fetching user location:", error);
      }
    };

    Promise.all([fetchPantries(), fetchUserLocation()])
      .then(() => setLoading(false))
      .catch((error) => console.error("Error in fetching data:", error));
  }, [user, pantries]);


  if (loading) {
    return (
      <div className="p-7">
        <div className="mt-8 flex flex-col items-start justify-between gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-center sm:gap-0">
          <Skeleton className="w-48 h-8 mb-3 bg-gray-300 rounded-lg" />
          <div className="flex gap-x-3">
            <div className="w-24 h-10 bg-gray-300 rounded-lg"></div>
            <div className="w-32 h-10 bg-gray-300 rounded-lg"></div>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, index) => (
            <PantrySkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-7">
      <main className="mx-auto max-w-7xl md:p-2">
        <div className="mt-8 flex flex-col items-start justify-between gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-center sm:gap-0">
          <h1 className="mb-3 font-bold text-3xl">My Store</h1>
          <div className="flex gap-x-3">
            <Button onClick={() => pantryModal.onOpen()}>New Pantry</Button>
            <Button
              onClick={receipemModel.onOpen}
              variant="outline"
            >
              Generate Recipe
            </Button>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {pantries?.length > 0 ? (
            pantries.map((pantry: any) => (
              <PantryCard
                id={pantry?.id!}
                key={pantry.id}
                name={pantry.name}
                date={pantry.date}
                quantity={pantry.quantity}
                category={pantry.category}
              />
            ))
          ) : (
            <div className="text-center">No data available</div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Store;