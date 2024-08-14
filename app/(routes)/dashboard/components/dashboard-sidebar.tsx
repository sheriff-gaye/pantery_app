import Image from "next/image";
import SideBarRoutes from "./SideBarRoutes";

const DashboardSidebar = () => {
  return (
    <div className="h-full  border-r flex flex-col  overflow-y-auto shadow-sm">
      <div className="p-6">
        <div className="relative h-8 w-8 mr-4 gap-3">
          <Image src="/logo.png" alt="logo" fill />
          <h2 className="text-xl font-bold ml-9">Pantry </h2>
        </div>
      </div>

      <div className="flex flex-col w-full">
        <SideBarRoutes />
      </div>
    </div>
  );
};

export default DashboardSidebar;
