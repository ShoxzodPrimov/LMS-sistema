import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/header/Header";
import styles from "./MainLayout.module.scss";

export default function MainLayout() {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div className={styles.layout}>
            <Sidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
            <div className={`${styles.main} ${isCollapsed ? styles.mainCollapsed : ""}`}>
                <Header />
                <main className={styles.content}>
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
