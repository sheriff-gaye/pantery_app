
import React from "react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import DashboardSidebar from "./dashboard-sidebar";

const MobileSideBar = () => {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
        <Menu  className="text-black"/>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 bg-white">
        <DashboardSidebar />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSideBar;