import { RefObject } from 'react'
import './Sidebar.scss'

interface SidebarProps{
    isSidebarVisible:boolean,
    sidebarRef: RefObject<HTMLDivElement>
}

export const Sidebar = ({isSidebarVisible, sidebarRef}:SidebarProps) => {
    
    return (
        <div ref={sidebarRef} className={`sidebar ${isSidebarVisible ? 'visible' : ''}`}>
            <h2>Налаштування сторінки</h2>
            {/* Додайте тут свої налаштування */}
        </div>
    )
}