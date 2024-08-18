"use client";

import useAuth from "@/hooks/auth";
import {  Loader2} from "lucide-react";
import { useRouter } from "next/navigation";
import { use, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import DataCards from "./components/data-cards";
import ComingDeadlines from "./components/coming-deadlines";
import CategoryChart from "./components/category-chart";

const Dashboard = () => {
  const { user, loading } = useAuth();
  const router = useRouter();
  

  useEffect(() => {
    if (!loading && !user) {
      router.push("/");
    }
  }, [loading, user, router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <Loader2 className="h-12 w-12 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="p-9">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <DataCards />
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <ComingDeadlines/>
        <CategoryChart/>
        
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
