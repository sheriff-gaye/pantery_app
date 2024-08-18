import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase"; // Adjust the import based on your project structure

export async function getAllPantries() {
  try {
    const pantryCollection = collection(db, "pantry");
    const pantrySnapshot = await getDocs(pantryCollection);
    const pantries = pantrySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    return pantries;
  } catch (error) {
    console.error("Error getting pantries: ", error);
    throw new Error("Failed to fetch pantry items");
  }
}