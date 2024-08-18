import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import { Category } from "@/app/(routes)/categories/components/columns";

export async function getCategories() {
  const querySnapshot = await getDocs(collection(db, "category"));

  const data: Category[] = querySnapshot.docs.map((doc) => {
    const docData = doc.data();
    return {
      id: doc.id,
      category: docData.name,  
    };
  });

 
  return data;
}



export async function totalCategories(){

    const querySnapshot = await getDocs(collection(db, "category"));

    const data: Category[] = querySnapshot.docs.map((doc) => {
      const docData = doc.data();
      return {
        id: doc.id,
        category: docData.name,  
      };
    });
  
   
    return data.length;

}


export async function allCatgeories(){
   
        const querySnapshot = await getDocs(collection(db, "category"));
        const categoriesArray = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        return categoriesArray
        
}