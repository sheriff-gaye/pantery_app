"use client"

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
import Image from "next/image";

const Navbar = () => {


  const { setTheme } = useTheme();
  return (
    <nav className="py-4  bg-transparent flex  items-center justify-between w-full border-b">
      <Link href="/" className="flex items-center">
        <div className="relative h-8 w-8 mr-4 gap-3">
        <Image src="/logo.png" alt="logo" fill />
          <h2 className="text-xl font-bold ml-9">Pantry </h2>
        </div>
      </Link>

      <div className="items-center gap-x-4 flex">
        <div>
          <Link href="/login">
           <Button size="lg">Login</Button>
          </Link>
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
