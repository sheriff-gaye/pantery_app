
"use client"


import useAuth from "@/hooks/auth";
import { redirect } from "next/navigation";



const Dashboard = () => {
    const { user, loading } = useAuth(); 

    if(!user){
        redirect('/');

    }

    return <p>Welcome to the Pantry Dashboard, {user?.displayName} </p>;

};

export default Dashboard;
