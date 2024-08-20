
import MobileSideBar from "./mobile-sidebar"
import NabBarRoutes from "./NavBarRoutes"

const DashbaordNavbar=()=>{


    return (
        <div className='p-4  h-full  flex  items-center shadow-sm border  border-b z-[99999] bg-white dark:bg-background'>
            <MobileSideBar/>
            <NabBarRoutes/>
    
        </div>

    )
}

export default DashbaordNavbar