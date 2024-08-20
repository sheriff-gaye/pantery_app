import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import { Category } from "@/app/(routes)/categories/components/columns";



export async function getCategories() {
  const categoriesQuery = collection(db, "category");

  const querySnapshot = await getDocs(categoriesQuery);

  const data: Category[] = querySnapshot.docs.map((doc) => {
    const docData = doc.data();
    return {
      id: doc.id,
      category: docData.name,
    };
  });

  return data;
}

export async function totalCategories() {
  const querySnapshot = await getDocs(collection(db, "category"));
    return querySnapshot.size;
}
export async function allCategories() {
  const querySnapshot = await getDocs(collection(db, "category"));
    const categoriesArray = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return categoriesArray;
}