import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import styles from "./ManagementContent.module.scss";
import Courses from "../Courses/Courses";

const tabs = ["Kurslar", "Xonalar", "Xodimlar"];

export default function ManagementContent() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [activeTab, setActiveTab] = useState("Kurslar");

    useEffect(() => {
        const tab = searchParams.get("tab");
        if (tab && tabs.includes(tab)) {
            setActiveTab(tab);
        }
    }, [searchParams]);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setSearchParams({ tab });
    };

    return (
        <div className={styles.managementContent}>
            <div className={styles.header}>
                <h1 className={styles.title}>Boshqarish</h1>
                <div className={styles.tabs}>
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            className={`${styles.tab} ${activeTab === tab ? styles.tabActive : ""}`}
                            onClick={() => handleTabChange(tab)}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            <div className={styles.content}>
                {activeTab === "Kurslar" && <Courses />}
                {activeTab === "Xonalar" && <div className={styles.placeholder}>Xonalar ro'yxati (Tez kunda...)</div>}
                {activeTab === "Xodimlar" && <div className={styles.placeholder}>Xodimlar ro'yxati (Tez kunda...)</div>}
            </div>
        </div>
    );
}
