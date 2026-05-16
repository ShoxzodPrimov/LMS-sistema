import { useState } from "react";
import styles from "./Groups.module.scss";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import Switch from '@mui/material/Switch';

const groupsData = [
    {
        id: 1,
        status: true,
        name: "N26",
        course: "Backend",
        duration: "6 oy",
        time: "09:30",
        days: "Du, Se, Chor, Pay, Ju",
        room: "Autodesk",
        teacher: "Mohirbek",
        students: 1
    },
    {
        id: 2,
        status: true,
        name: "n105",
        course: "Backend",
        duration: "6 oy",
        time: "16:00",
        days: "Se, Pay, Shan",
        room: "Autodesk",
        teacher: "Mohirbek",
        students: 4
    }
];

export default function Groups() {
    const [activeTab, setActiveTab] = useState("groups");

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Guruhlar</h1>
                <button className={styles.addBtn}>
                    <AddRoundedIcon />
                    Guruh qo'shish
                </button>
            </div>

            <div className={styles.tabs}>
                <button 
                    className={`${styles.tab} ${activeTab === "groups" ? styles.activeTab : ""}`}
                    onClick={() => setActiveTab("groups")}
                >
                    <GroupsRoundedIcon fontSize="small" />
                    Guruhlar
                </button>
                <button 
                    className={`${styles.tab} ${activeTab === "archive" ? styles.activeTab : ""}`}
                    onClick={() => setActiveTab("archive")}
                >
                    <ArchiveOutlinedIcon fontSize="small" />
                    Arxiv
                </button>
            </div>

            <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                    <div className={styles.statHeader}>
                        <div className={styles.statIconWrapper}>
                            <GroupsRoundedIcon />
                        </div>
                        <MoreVertRoundedIcon className={styles.moreIcon} />
                    </div>
                    <div className={styles.statInfo}>
                        <p className={styles.statLabel}>Jami guruhlar</p>
                        <h2 className={styles.statValue}>2</h2>
                    </div>
                </div>

                <div className={styles.statCard}>
                    <div className={styles.statHeader}>
                        <div className={styles.statIconWrapper} style={{ backgroundColor: '#F0FDF4', color: '#16A34A' }}>
                            <PersonRoundedIcon />
                        </div>
                        <MoreVertRoundedIcon className={styles.moreIcon} />
                    </div>
                    <div className={styles.statInfo}>
                        <p className={styles.statLabel}>O'qituvchilar</p>
                        <h2 className={styles.statValue}>0</h2>
                    </div>
                </div>

                <div className={styles.statCard}>
                    <div className={styles.statHeader}>
                        <div className={styles.statIconWrapper} style={{ backgroundColor: '#EFF6FF', color: '#2563EB' }}>
                            <SchoolRoundedIcon />
                        </div>
                        <MoreVertRoundedIcon className={styles.moreIcon} />
                    </div>
                    <div className={styles.statInfo}>
                        <p className={styles.statLabel}>O'quvchilar</p>
                        <h2 className={styles.statValue}>0</h2>
                    </div>
                    <div className={styles.studentAvatars}>
                        {/* Placeholder for small avatars in screenshot */}
                        <div className={styles.smallAvatar} style={{ background: '#3b82f6' }}>I</div>
                        <div className={styles.smallAvatar} style={{ background: '#ef4444' }}>M</div>
                        <div className={styles.smallAvatar} style={{ background: '#f59e0b' }}>S</div>
                    </div>
                </div>
            </div>

            <div className={styles.tableCard}>
                <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Status</th>
                                <th>Guruh nomi</th>
                                <th>Kurs</th>
                                <th>Davomiyligi</th>
                                <th>Dars vaqti</th>
                                <th>Xona</th>
                                <th>O'qituvchi</th>
                                <th>Talabalar</th>
                                <th style={{ textAlign: 'right' }}>
                                    <RefreshRoundedIcon className={styles.refreshIcon} />
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {groupsData.map((group) => (
                                <tr key={group.id}>
                                    <td>
                                        <div className={styles.statusCell}>
                                            <Switch 
                                                defaultChecked={group.status} 
                                                size="small"
                                                sx={{
                                                    '& .MuiSwitch-switchBase.Mui-checked': {
                                                        color: '#6c35de',
                                                    },
                                                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                                        backgroundColor: '#6c35de',
                                                    },
                                                }}
                                            />
                                            <span className={styles.statusLabel}>FAOL</span>
                                        </div>
                                    </td>
                                    <td><span className={styles.groupName}>{group.name}</span></td>
                                    <td>
                                        <span className={styles.courseTag}>{group.course}</span>
                                    </td>
                                    <td>{group.duration}</td>
                                    <td>
                                        <div className={styles.timeInfo}>
                                            <span className={styles.time}>{group.time}</span>
                                            <span className={styles.days}>{group.days}</span>
                                        </div>
                                    </td>
                                    <td>{group.room}</td>
                                    <td>{group.teacher}</td>
                                    <td><span className={styles.studentCount}>{group.students}</span></td>
                                    <td style={{ textAlign: 'right' }}>
                                        <MoreVertRoundedIcon className={styles.rowMoreIcon} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
