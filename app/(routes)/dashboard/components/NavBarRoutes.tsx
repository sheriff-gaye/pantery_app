"use client";
import { useRouter } from "next/navigation";
import { LogOut, MoonIcon, SunIcon } from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";
import useAuth from "@/hooks/auth";

const NabBarRoutes = () => {
  const router = useRouter();
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();
  const { user, loading } = useAuth();

  const onLogout = async () => {
    try {
      await signOut(auth);
      router.push("/"); // Redirect to the home page or login page after logout
    } catch (error) {
      toast({
        title: "Logout Error",
        description: "There was an issue logging you out. Please try again."
      });
    }
  };

  return (
    <>
      <div className="flex  gap-x-2 ml-auto z-1">
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="z-10">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div>
          <Image
            src={user?.photoURL!}
            className="rounded-full"
            alt="user_profile"
            width={40}
            height={40}
          />
        </div>
        <div>
          <Button size="lg" onClick={onLogout}>
            Logout
          </Button>
        </div>
      </div>
    </>
  );
};

export default NabBarRoutes;
