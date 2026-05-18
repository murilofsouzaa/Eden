import {Dialog} from '@headlessui/react'
import {X} from 'lucide-react'

import SearchInput from '../SearchInput/SearchInput'

export type SidebarProps={
    isSidebarActive:boolean;
    toggleSidebar: () => void;
    toggleSearch: () => void;
}

const Sidebar = ({isSidebarActive, toggleSidebar, toggleSearch}:SidebarProps) => {
    
    return ( 
        <Dialog open={isSidebarActive} onClose={toggleSidebar}>
            <div className="fixed inset-0 z-100 bg-white overflow-hidden">
                <Dialog.Panel>
                    <div>
                        <X></X>
                        <SearchInput toggleSearch={toggleSearch}></SearchInput>
                    </div>
                    <div></div>
                </Dialog.Panel>
            </div>
        </Dialog>
     );
}
 
export default Sidebar;