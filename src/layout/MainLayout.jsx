import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/header/Header";
import ManagementSidebar from "../components/ManagementSidebar/ManagementSidebar";
import styles from "./MainLayout.module.scss";

export default function MainLayout() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const location = useLocation();
    const [isSubSidebarVisible, setIsSubSidebarVisible] = useState(false);
    
    // Open subsidebar when navigating to management if not already open
    useEffect(() => {
        if (location.pathname.startsWith('/management')) {
            // We can keep it open or let the user toggle it. 
            // For now, let's say clicking "Boshqarish" opens it.
        }
    }, [location.pathname]);

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    const toggleSubSidebar = () => {
        setIsSubSidebarVisible(!isSubSidebarVisible);
    };

    const closeSubSidebar = () => {
        setIsSubSidebarVisible(false);
    };

    return (
        <div className={styles.layout}>
            <Sidebar 
                isCollapsed={isCollapsed} 
                toggleSidebar={toggleSidebar} 
                isSubSidebarOpen={isSubSidebarVisible}
                toggleSubSidebar={toggleSubSidebar}
            />
            <ManagementSidebar 
                isOpen={isSubSidebarVisible} 
                isCollapsed={isCollapsed}
                onClose={closeSubSidebar}
            />
            <div className={`${styles.main} ${isCollapsed ? styles.mainCollapsed : ""} ${isSubSidebarVisible ? styles.mainWithSubSidebar : ""}`}>
                <Header />
                <main className={styles.content}>
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
