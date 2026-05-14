import { NavLink } from "react-router-dom";
import styles from "./Sidebar.module.scss";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import DiamondRoundedIcon from '@mui/icons-material/DiamondRounded';
import CardGiftcardRoundedIcon from '@mui/icons-material/CardGiftcardRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import ReplayIcon from '@mui/icons-material/Replay';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';

const menuItems = [
    { label: "Asosiy", icon: <HomeRoundedIcon />, path: "/dashboard" },
    { label: "O'qituvchilar", icon: <PersonRoundedIcon />, path: "/teachers" },
    { label: "Guruhlar", icon: <GroupRoundedIcon />, path: "/groups" },
    { label: "Talabalar", icon: <DiamondRoundedIcon />, path: "/students" },
    { label: "Sovg'alar", icon: <CardGiftcardRoundedIcon />, path: "/gifts" },
    { label: "Boshqarish", icon: <SettingsRoundedIcon />, path: "/settings" },
];

export default function Sidebar() {
    return (
        <aside className={styles.sidebar}>
            <div className={styles.logo}>
                <SchoolRoundedIcon className={styles.logoIcon} />
                <span className={styles.logoText}>NajotEdu</span>
                <button className={styles.toggleBtn}>
                    <ChevronLeftRoundedIcon fontSize="small" />
                </button>
            </div>

            <nav className={styles.nav}>
                {menuItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `${styles.item}${isActive ? ` ${styles.itemActive}` : ""}`
                        }
                        end={item.path === "/dashboard"}
                    >
                        <span className={styles.itemIcon}>{item.icon}</span>
                        <span className={styles.itemLabel}>{item.label}</span>
                    </NavLink>
                ))}
            </nav>

            <div className={styles.subscription}>
                <div className={styles.subInfo}>
                    <span className={styles.subBell}><NotificationsRoundedIcon className={styles.bellIcon} /></span>
                    <div>
                        <p className={styles.subTitle}>Obuna</p>
                        <p className={styles.subStatus}>Obunangiz tugagan</p>
                    </div>
                </div>
                <button className={styles.subBtn}>
                    <ReplayIcon className={styles.subIcon} /> Obunani yangilash
                </button>
            </div>
        </aside>
    );
}