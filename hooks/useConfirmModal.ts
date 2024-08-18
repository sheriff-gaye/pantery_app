

import { useState } from "react";
import { getUserLocation } from "@/lib/location";
import { toast } from "@/components/ui/use-toast";
import { getAllPantries } from "@/actions/all-pantries";
import { generateRecipeSuggestions } from "@/app/(routes)/store/components/ai";

interface Pantry {
    id: string;
    name: string;
    date: string;
    quantity: number;
    category: string;
  }

const useConfirmModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = async () => {
    try {
      setIsOpen(true);

      // Fetch pantries and user location
      const [pantries, location] = await Promise.all([
        getAllPantries(),
        getUserLocation(),
      ]);

      // Generate recipe suggestions
      const recipes = await generateRecipeSuggestions(pantries:any[], location);

      // Show recipes (you could use a modal or some other UI element to display them)
      console.log(recipes); // Replace this with your logic to display recipes

      toast({
        title: "Recipe Suggestions",
        description: `Here are some recipes based on your pantries and location.`,
      });
    } catch (error) {
      console.error("Error generating recipes:", error);
      toast({
        title: "Error",
        description: "Failed to generate recipe suggestions.",
      });
    } finally {
      setIsOpen(false);
    }
  };

  const onClose = () => setIsOpen(false);

  return { isOpen, onOpen, onClose };
};

export default useConfirmModal;