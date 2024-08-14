"use client";

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

interface SideBarItemProps {
  label: string;
  icon: LucideIcon;
  href: string;
}

const SideBarItem = ({ label, icon: Icon, href }: SideBarItemProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = pathname === href;

  const onClick = () => {
    router.push(href);
  };

  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "flex  items-center gap-x-3 text-slate-500 text-sm font-[500] pl-6 transition-all   hover:bg-slate-300/20",
        isActive && " text-white bg-primary  hover:bg-primary "
      )}
    >
      <div className="flex items-center py-6 gap-x-2">
        <Icon
          className={cn("text-primary", isActive && "text-white")}
          size={22}
        />
        {label}
      </div>
    </button>
  );
};

export default SideBarItem;
