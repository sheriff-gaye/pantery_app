"use client";
import { Button } from "@/components/ui/button";
import { CalendarDays, Edit2, List, Minus, Plus, Trash } from "lucide-react";
import { useState } from "react";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import usePantryModal from "@/hooks/usePantryModal";

interface PantryCardProps {
  id: string;
  name: string;
  date: string;
  quantity: number;
  category: string;
}

const PantryCard = ({
  id,
  name,
  date,
  quantity,
  category
}: PantryCardProps) => {
  const [value, setValue] = useState(quantity);
  const router = useRouter();

  const Increment = async () => {
    try {
      const newQuantity = value + 1;
      setValue(newQuantity);

      await updateDoc(doc(db, "pantry", id), {
        quantity: newQuantity,
      });

      toast({
        title: "Success",
        description: "Quantity increased successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while updating the quantity.",
      });
    }
  };

  const decrease = async () => {
    try {
      const newQuantity = Math.max(value - 1, 1); 
      setValue(newQuantity);

      await updateDoc(doc(db, "pantry", id), {
        quantity: newQuantity,
      });

      toast({
        title: "Success",
        description: "Quantity decreased successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while updating the quantity.",
      });
    }
  };

  const handleEdit = () => {
    usePantryModal
      .getState()
      .onOpen({ id, name, date, quantity: value, category });
  };

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, "pantry", id));
      router.refresh();

      toast({
        title: "Success",
        description: `Pantry item has been deleted successfully.`
      });

      router.refresh();
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while deleting the item."
      });
    }
  };

  return (
    <div className="col-span-1 divide-y divide-gray-200 rounded-lg shadow transition hover:shadow-lg dark:bg-slate-800">
      <div className="flex flex-col gap-2">
        <article className="pt-6 px-6 flex w-full items-center justify-between space-x-6">
          <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gradient-to-r from-red-200 to-red-400" />
          <div className="flex-1 truncate">
            <div className="flex items-center justify-between">
              <h3 className="truncate text-lg font-medium text-zinc-900 dark:text-white">
                {name}
              </h3>
              <h3 className="font-bold text-xl">{value}</h3>
              <div className="gap-x-4 flex">
                <Button variant="secondary" onClick={Increment} size="icon">
                  <Plus className="w-4 h-4" />
                </Button>
                <Button variant="secondary" onClick={decrease} size="icon">
                  <Minus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </article>
      </div>

      <div className="px-6 mt-4 grid grid-cols-3 place-items-center py-2 gap-6 text-xs text-zinc-500">
        <div className="flex items-center gap-2 dark:text-white">
          <CalendarDays className="h-4 w-4 dark:text-white" />
          {date}
        </div>

        <div className="flex items-center gap-2 dark:text-white">
          <List className="h-4 w-4 dark:text-white" />
          {category}
        </div>

        <div className="flex gap-x-3">
          <Button variant="ghost" onClick={handleEdit}>
            <Edit2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" onClick={handleDelete}>
            <Trash className="h-4 w-4 text-primary" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PantryCard;
