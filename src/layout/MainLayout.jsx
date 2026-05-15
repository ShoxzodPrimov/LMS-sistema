import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/header/Header";
import ManagementSidebar from "../components/ManagementSidebar/ManagementSidebar";
import styles from "./MainLayout.module.scss";

export default function MainLayout() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const location = useLocation();
    
    const isSubSidebarOpen = location.pathname.startsWith('/management');

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div className={styles.layout}>
            <Sidebar 
                isCollapsed={isCollapsed} 
                toggleSidebar={toggleSidebar} 
                isSubSidebarOpen={isSubSidebarOpen}
            />
            <ManagementSidebar 
                isOpen={isSubSidebarOpen} 
                isCollapsed={isCollapsed}
            />
            <div className={`${styles.main} ${isCollapsed ? styles.mainCollapsed : ""} ${isSubSidebarOpen ? styles.mainWithSubSidebar : ""}`}>
                <Header />
                <main className={styles.content}>
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
