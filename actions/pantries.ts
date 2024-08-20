

import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import { db } from "@/firebase";

export interface PantryItem {
    id: string | any;
    name: string;
    date: string;
    quantity: number;
    category: string;
}


export async function allPantries(userId: string) {

    try {
        const q = query(collection(db, "pantry"), where("userId", "==", userId));
        const querySnapshot = await getDocs(q);

        const pantriesArray = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        return pantriesArray;

    } catch (error) {
        console.error("Error fetching pantry items:", error);
    }
}

export async function allPantriesNum(userId: string) {

    try {
        const q = query(collection(db, "pantry"), where("userId", "==", userId));
        const querySnapshot = await getDocs(q);

        const pantriesArray = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        return pantriesArray.length;

    } catch (error) {
        console.error("Error fetching pantry items:", error);
    }
}



export async function getTotalPantryQuantity(userId: string) {
    try {
        const pantriesCollection = collection(db, "pantry");
        const pantriesQuery = userId
            ? query(pantriesCollection, where("userId", "==", userId))
            : pantriesCollection;

        const querySnapshot = await getDocs(pantriesQuery);

        const totalQuantity = querySnapshot.docs.reduce((total, doc) => {
            const data = doc.data() as PantryItem;
            return total + (data.quantity || 0);
        }, 0);

        return totalQuantity;

    } catch (error) {
        console.error("Error fetching pantry items:", error);
    }
}

export async function firstFiveDeadlines(userId: string): Promise<PantryItem[]> {
    try {
        const pantriesQuery = userId
            ? query(
                collection(db, "pantry"),
                where("userId", "==", userId),
                orderBy("date", "asc"),
                limit(5)
            )
            : query(
                collection(db, "pantry"),
                orderBy("date", "asc"),
                limit(5)
            );

        const querySnapshot = await getDocs(pantriesQuery);

        const pantries = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        })) as PantryItem[];

        return pantries;

    } catch (error) {
        console.error("Error Fetching Pantries:", error);
        return [];
    }
}

export async function totalExpiredPantries(userId: string): Promise<number | undefined> {
    try {
        const currentDate = new Date().toISOString().split("T")[0];

        const pantriesCollection = collection(db, "pantry");
        const expiredPantriesQuery = query(
            pantriesCollection,
            where("userId", "==", userId),
            where("date", "<", currentDate)
        );

        const querySnapshot = await getDocs(expiredPantriesQuery);
        return querySnapshot.size; 

    } catch (error) {
        console.error("Error getting expired products:", error);
        return 0; 
    }
}


export async function getCategoryChartData(userId: string) {
    try {
        const pantriesCollection = collection(db, "pantry");
        const categoryQuery = userId
            ? query(pantriesCollection, where("userId", "==", userId))
            : pantriesCollection;

        const querySnapshot = await getDocs(categoryQuery);

        const categoryCounts: Record<string, number> = {};

        querySnapshot.docs.forEach(doc => {
            const data = doc.data() as PantryItem;
            const category = data.category || "Uncategorized";

            if (categoryCounts[category]) {
                categoryCounts[category]++;
            } else {
                categoryCounts[category] = 1;
            }
        });

        const chartData = Object.keys(categoryCounts).map(category => ({
            name: category,
            value: categoryCounts[category],
        }));

        chartData.sort((a, b) => b.value - a.value);

        return chartData;

    } catch (error) {
        console.error("Error fetching pantry items for chart:", error);
    }
}