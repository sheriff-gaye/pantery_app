"use client";

import { useAuth } from "@/hooks/auth";
import DataCards from "./components/data-cards";
import ComingDeadlines from "./components/coming-deadlines";
import CategoryChart from "./components/category-chart";
import { DashboardSkeleton } from "./components/skeleton";

const Dashboard = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <DashboardSkeleton />;
  }

  if (!user)return;

  return (
    <div className="p-9">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <DataCards />
         <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3"> 
          <ComingDeadlines />
          <CategoryChart />
        </div> 
      </main>
    </div>
  );
};

export default Dashboard