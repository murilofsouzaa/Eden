export type SidebarProps={
    isActive:boolean;
}

const Sidebar = ({isActive}:SidebarProps) => {
    
    return ( 
        <>
            {isActive && (
                <div className="inset-0 z-100 bg-white">

                </div>
            )}
        </>
     );
}
 
export default Sidebar;