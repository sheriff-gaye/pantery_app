"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { auth } from "./../../../firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/hooks/auth";
import Logo from "./logo";

const Navbar = () => {
  const { setTheme } = useTheme();

  const router = useRouter();
  const { toast } = useToast();

  const googleAuth = new GoogleAuthProvider();

  const onLogin = async () => {
    try {
      await signInWithPopup(auth, googleAuth);
      router.push("/dashboard");
    } catch (error) {
      toast({
        title: "Authentication Error",
        description: "Please Try Again"
      });
    }
  };

  const { user, loading } = useAuth();


  if (loading) return null;

  return (
    <nav className="py-4  bg-transparent flex  items-center justify-between w-full border-b">
      <Logo />

      <div className="items-center gap-x-4 flex">
        <div>
          <Button size="lg" disabled={loading} onClick={onLogin}>
            {user ? "Go to Dashboard" : "Login"}
          </Button>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
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
    </nav>
  );
};

export default Navbar;
