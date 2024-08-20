"use client";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Modal from "./modal";
import { Button } from "../ui/button";
import useReceipeModal from "@/hooks/useConfirmModal";
import { chatSession } from "@/app/(routes)/store/components/ai";
import { allPantries, PantryItem } from "@/actions/pantries";
import { useAuth } from "@/hooks/auth";
import { getUserLocation } from "@/lib/lat";

const ReceipeModal = () => {

  const receipeModal = useReceipeModal();
  const [isLoading, setIsLoading] = useState(false);
  const [recipes, setRecipes] = useState<string[] | null>(null);
  const [userLocation, setUserLocation] = useState<string | any>(null);
  const [pantries, setPantries] = useState<PantryItem[]>([]);
  const { user } = useAuth();

  console.log("test",userLocation)


  useEffect(() => {
    const fetchPantries = async () => {
      if (user?.uid) {
        try {
          setIsLoading(true);
          const data: any = await allPantries(user.uid);
          setPantries(data);
        } catch (error) {
          console.error("Error fetching pantries:", error);
        } finally {
          setIsLoading(false);
        }
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

    fetchPantries();
    fetchUserLocation();
  }, [user?.uid]);


  const onSubmit: SubmitHandler<FieldValues> = async () => {
    receipeModal.onOpen();

    const prompt = `Suggest recipes based on the following ingredients: ${pantries
      .map((pantry) => pantry.name)
      .join(", ")} and user location: ${userLocation}. in less than 150 words listed them base on recipes and  list them in numbers`;

    const result = await chatSession.sendMessage(prompt);
    const aiOutput = result.response.text();
    setRecipes(aiOutput.split("\n\n"));

   
  };

  const bodyContent = (
    <>
      <div className="flex justify-center">
        <p>Generate Food Recipes From your Store </p>
      </div>
      <div className="flex flex-col gap-2 p-6">
        {/* Display generated recipes */}
        {recipes && (
          <div>
            <h3>Recipe Suggestions:</h3>
            <ul>
              {recipes.map((recipe, index) => (
                <li key={index}>{recipe}</li>
              ))}
            </ul>
          </div>
        )}
        <div className="flex flex-row items-end justify-end gap-4 w-full">
          <Button
            type="button"
            variant="outline"
            onClick={receipeModal.onClose}
          >
            Cancel
          </Button>
          <Button type="submit" onClick={onSubmit} disabled={isLoading}>
            {isLoading ? "Generating..." : "Generate"}
          </Button>
        </div>
      </div>
    </>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={receipeModal.isOpen}
      title="Generate Food Recipes From your Store"
      onClose={receipeModal.onClose}
      body={bodyContent}
      actionLabel="Create"
    />
  );
};

export default ReceipeModal;
