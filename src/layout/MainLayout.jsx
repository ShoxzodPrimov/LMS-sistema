import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/header/Header";
import ManagementSidebar from "../components/ManagementSidebar/ManagementSidebar";
import styles from "./MainLayout.module.scss";

export default function MainLayout() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isSubSidebarVisible, setIsSubSidebarVisible] = useState(false);

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    const toggleSubSidebar = () => {
        setIsSubSidebarVisible(!isSubSidebarVisible);
    };

    const closeSubSidebar = () => {
        setIsSubSidebarVisible(false);
    };

    const auth = localStorage.getItem('accessToken');
    if ( !auth )
        return <Navigate to='/login' />

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
