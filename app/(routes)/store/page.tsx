"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import PantryCard from "./components/pantry";
import usePantryModal from "@/hooks/usePantryModal";
import { allPantries } from "@/actions/pantries";
import PantrySkeleton from "./components/skeleton";
import useConfirmModal from "@/hooks/useConfirmModal";
import { getUserLocation } from "@/lib/location";

const Store = () => {
  const pantryModal = usePantryModal();
  const confirmModel = useConfirmModal();
  const [pantries, setPantries] = useState<any[]>([]);

  useEffect(() => {
    const fetchPantries = async () => {
      try {
        const data = await allPantries();
        setPantries(data);
      } catch (error) {
        console.error("Error fetching pantries:", error);
      }
    };

    fetchPantries();
  }, [pantries]);



  return (
    <div className="p-7">
      <main className="mx-auto max-w-7xl md:p-2">
        <div className="mt-8 flex flex-col items-start justify-between gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-center sm:gap-0">
          <h1 className="mb-3 font-bold text-3xl">My Pantries</h1>
          <div className="flex gap-x-3">
            <Button onClick={() => pantryModal.onOpen()}>New Pantry</Button>
            <Button onClick={() => confirmModel.onOpen()} variant="outline">
              Generate Recipe
            </Button>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {pantries.length === 0
            ? Array.from({ length: 6 }).map((_, index) => (
                <PantrySkeleton key={index} />
              ))
            : pantries.map((pantry) => (
                <PantryCard
                  id={pantry.id}
                  key={pantry.id}
                  name={pantry.name}
                  date={pantry.date}
                  quantity={pantry.quantity}
                  category={pantry.category}
                />
              ))}
        </div>
      </main>
    </div>
  );
};

export default Store;
