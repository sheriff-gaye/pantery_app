"use client";
import { DatabaseIcon, Layout, List, Store, User } from "lucide-react";
import SiderBarItem from "./SiderBarItem";

const guestRoute = [
  {
    icon: DatabaseIcon,
    label: "Dashboard",
    href: "/dashboard"
  },
  {
    icon: List,
    label: "Categories",
    href: "/categories"
  },
  {
    icon: Store,
    label: "My Store",
    href: "/store"
  },

  {
    icon: User,
    label: "Profile",
    href: "/profile"
  }
];

const SideBarRoutes = () => {
  return (
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
  );
};

export default SideBarRoutes;
