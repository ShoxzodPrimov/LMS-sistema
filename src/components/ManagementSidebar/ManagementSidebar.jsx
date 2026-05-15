import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ManagementSidebar.module.scss";
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import MeetingRoomRoundedIcon from '@mui/icons-material/MeetingRoomRounded';
import BadgeRoundedIcon from '@mui/icons-material/BadgeRounded';
import MonetizationOnRoundedIcon from '@mui/icons-material/MonetizationOnRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';

const subMenuItems = [
    { label: "Kurslar", icon: <SchoolRoundedIcon /> },
    { label: "Xonalar", icon: <MeetingRoomRoundedIcon /> },
    { label: "Xodimlar", icon: <BadgeRoundedIcon /> },
    { label: "Coin", icon: <MonetizationOnRoundedIcon /> },
    { label: "Xabar Yuborish", icon: <SendRoundedIcon /> },
];

export default function ManagementSidebar({ isOpen, isCollapsed, onClose }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const navigate = useNavigate();

    return (
        <div className={`${styles.subSidebar} ${isOpen ? styles.open : ""} ${isCollapsed ? styles.collapsed : ""}`}>
            <div className={styles.header}>
                <h3 className={styles.title}>Menu</h3>
            </div>
            <div className={styles.content}>
                {subMenuItems.map((item, index) => (
                    <div 
                        key={index} 
                        className={`${styles.item} ${activeIndex === index ? styles.itemActive : ""}`}
                        onClick={() => {
                            setActiveIndex(index);
                            if (item.label !== "Coin" && item.label !== "Xabar Yuborish") {
                                onClose();
                                navigate(`/management/content?tab=${item.label}`);
                            }
                        }}
                    >
                        <span className={styles.icon}>{item.icon}</span>
                        <span className={styles.label}>{item.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
