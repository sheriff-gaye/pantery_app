import { db } from "../firebase.js";
import { collection, addDoc } from "firebase/firestore";

const foodCategories = [
  "Carbohydrates",
  "Proteins",
  "Fats",
  "Vitamins",
  "Minerals",
  "Fiber",
  "Water",
];

async function seedCategories() {
  try {
    const categoryCollection = collection(db, "category");

    for (const category of foodCategories) {
      await addDoc(categoryCollection, {
        name: category,
        isGlobal: true, 
      });
      console.log(`Category '${category}' added successfully`);
    }
    console.log("All categories have been seeded successfully.");
  } catch (error) {
    console.error("Error seeding categories:", error);
  }
}

seedCategories();