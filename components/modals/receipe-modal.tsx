"use client";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import Modal from "./modal";
import { Button } from "../ui/button";
import useReceipeModal from "@/hooks/useConfirmModal";
import { chatSession } from "@/app/(routes)/store/components/ai";
import { allPantries, PantryItem } from "@/actions/pantries";
import { useAuth } from "@/hooks/auth";
import { getCity } from "@/lib/location";
import { Copy } from "lucide-react";
import { toast } from "../ui/use-toast";

const ReceipeModal = () => {
  const receipeModal = useReceipeModal();
  const [isLoading, setIsLoading] = useState(false);
  const [recipes, setRecipes] = useState<string[] | null>(null);
  const [userLocation, setUserLocation] = useState<string | any>(null);
  const [pantries, setPantries] = useState<PantryItem[]>([]);
  const { user } = useAuth();

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
        const location = await getCity();
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
      .join(
        ", "
      )} and user location: ${userLocation}. in less than 150 words listed them base on recipes and  list them in numbers`;

    const result = await chatSession.sendMessage(prompt);
    const aiOutput = result.response.text();
    setRecipes(aiOutput.split("\n\n"));
  };

  const copyToClipboard = () => {
    if (recipes && recipes.length > 0) {
      const textToCopy = recipes.join("\n\n");
      navigator.clipboard.writeText(textToCopy).then(
        () => {
          toast({
            title: "Success",
            description: `Copied to Clipbord successfully.`,
          });
        },
        (err) => {
          toast({
            title: "Faile",
            description: `Failed to Copy.`,
          });
        }
      );
    }
  };

  const bodyContent = (
    <>
      <div className="flex justify-center">
        <p>Generate Food Recipes From your {userLocation}</p>
      </div>
      <div className="flex flex-col gap-2 p-6">
        {/* Display generated recipes */}
        {recipes && (
          <div>
            <h3>Recipe Suggestions:</h3>
            <ol className="space-y-4 leading-relaxed">
              {recipes.map((recipe, index) => (
                <li key={index} className="p-3">
                  {recipe}
                </li>
              ))}
            </ol>
          </div>
        )}
        <div className="flex flex-row items-end justify-end gap-4 w-full">
          <Button
            type="button"
            variant="outline"
            onClick={receipeModal.onClose}
          >
            Close
          </Button>
          <Button variant="ghost" onClick={copyToClipboard}>
            <Copy />
          </Button>

          <Button type="submit" onClick={onSubmit} disabled={isLoading}>
            {isLoading ? "Generating..." : "Click to Generate"}
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
      actionLabel="Generate"
    />
  );
};

export default ReceipeModal;
