import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";

export async function allPantries() {
  try {
    const querySnapshot = await getDocs(collection(db, "pantry"));
    const pantriesArray = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return pantriesArray


  } catch (error) {
    console.error("Error fetching pantry items:", error);
    throw new Error("Failed to fetch pantry items.");
  }
}