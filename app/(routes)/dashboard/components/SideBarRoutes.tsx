"use client"
import { Compass, Layout } from "lucide-react";
import SiderBarItem from "./SiderBarItem"


const guestRoute = [
    {
      icon: Layout,
      label: "Dashboard",
      href: "/dashboard"
    },
    {
      icon: Compass,
      label: "Browse",
      href: "/search"
    },

  ];

const SideBarRoutes=()=>{

    return(
        <div className="flex flex-col w-full ">
        {guestRoute.map((route) => (
          <SiderBarItem
            key={route.href}
            icon={route.icon}
            label={route.label}
            href={route.href}
          />
        ))}
      </div>

    )
}


export default SideBarRoutes;