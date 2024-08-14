"use client";

import useAuth from "@/hooks/auth";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

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
      <div>
        <Loader2 className="h-4 w-5 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return <p>Welcome to the Pantry Dashboard, {user.displayName}</p>;
};

export default Dashboard;
