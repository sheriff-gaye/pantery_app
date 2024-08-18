
import MobileSideBar from "./mobile-sidebar"
import NabBarRoutes from "./NavBarRoutes"

const DashbaordNavbar=()=>{


    return (
        <div className='p-4  h-full  flex  items-center shadow-sm border  border-b z-[99999] bg-white'>
            <MobileSideBar/>
            <NabBarRoutes/>
    
        </div>

    )
}

export default DashbaordNavbar