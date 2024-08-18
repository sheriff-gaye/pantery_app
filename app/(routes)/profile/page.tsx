"use client";

import useAuth from "@/hooks/auth";
import { useState } from "react";
import { doc, deleteDoc, getDoc } from "firebase/firestore";
import { deleteUser } from "firebase/auth";
import { db } from "@/firebase"; // Adjust based on your project structure
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast"; // Assume you're using a toast component for notifications

const ProfilePage = () => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  const handleDeleteAccount = async () => {
    if (!user) return;

    setDeleting(true);

    try {
      await deleteDoc(doc(db, "users", user.uid));

      await deleteUser(user);

      toast({
        title: "Account Deleted",
        description: "Your account has been successfully deleted.",
      });

      router.push("/"); 
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while deleting your account.",
      });
      console.error("Error deleting account: ", error);
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="p-9">
        <Skeleton className="h-24 w-24 mb-4" />
        <Skeleton className="h-6 w-1/3 mb-2" />
        <Skeleton className="h-6 w-1/4 mb-2" />
        <Skeleton className="h-6 w-1/5" />
      </div>
    );
  }

  return (
    <div className="p-9">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <div className="flex justify-start">
            <Avatar className="h-24 w-24 mr-4">
              <AvatarImage src={user?.photoURL || "/placeholder-avatar.png"} />
              <AvatarFallback>{user?.displayName?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-xl">
                {user?.displayName || "Anonymous User"}
              </CardTitle>
              <p className="text-sm text-gray-500">{user?.email}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {user ? (
            <div className="space-y-4">
              <p className="text-md">
                <strong>Full Name:</strong> {user?.displayName || "N/A"}
              </p>
              <p className="text-md">
                <strong>Email:</strong> {user?.email || "N/A"}
              </p>
              <p className="text-md">
                <strong>Creation Time:</strong> {user?.metadata.creationTime || "N/A"}
              </p>
              <p className="text-md">
                <strong>Last Sign-In Time:</strong> {user?.metadata.lastSignInTime || "N/A"}
              </p>
              <p className="text-md">
                <strong>Tenant ID:</strong> {user?.tenantId || "N/A"}
              </p>
              <p className="text-md">
                <strong>Provider ID:</strong> {user?.providerId || "N/A"}
              </p>
            </div>
          ) : (
            <p className="text-md">No additional profile information available.</p>
          )}
        </CardContent>
        <div className="p-4">
          <Button
            onClick={handleDeleteAccount}
            disabled={deleting}
          >
            {deleting ? "Deleting..." : "Delete Account"}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ProfilePage;