import Image from "next/image";
import SideBarRoutes from "./SideBarRoutes";
import Link from "next/link";

const DashboardSidebar = () => {
  return (
    <div className="h-full  border-r flex flex-col  overflow-y-auto shadow-sm">
      <Link href="/dashboard">
        <div className="p-6 ml-[-5rem]  flex justify-center items-center">
          <div className="relative h-8 w-8  gap-3">
            <Image src="/logo.png" alt="logo" fill />
            <h2 className="text-xl font-bold ml-9 text-black ">Pantry </h2>
          </div>
        </div>
      </Link>

      <div className="flex flex-col w-full">
        <SideBarRoutes />
      </div>
    </div>
  );
};

export default DashboardSidebar;
