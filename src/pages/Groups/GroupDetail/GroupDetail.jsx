import { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { api } from "../../../api/api";
import styles from "./GroupDetail.module.scss";
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
// import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded';
// import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
// import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';

export default function GroupDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [currentMonth, setCurrentMonth] = useState(0);
    const [showAllMonths, setShowAllMonths] = useState(false);
    const [OverallLessons] = useState([]);    
    const [schedules, setSchedules] = useState([]);
    const [groupDetails, setGroupDetails] = useState(null);
    
    useEffect(() => {
        const fetchSchedules = async () => {
            try {
                const res = await api.get(`/groups/${id}/schedules`);
                console.log(res)
                const data = res.data;
                // data is an array of objects, each object can have keys "1", "2", "3"... 
                // representing study months
                const formattedSchedules = [];
                data.forEach((item) => {
                    const keys = Object.keys(item).sort((a, b) => Number(a) - Number(b));
                    keys.forEach((key) => {
                        const value = item[key];
                        formattedSchedules.push({
                            id: key,
                            label: `${key}-o'quv oyi`,
                            isCurrent: value.isActive,
                            days: value.days.map((d, dIdx) => ({
                                id: `${key}-${dIdx}`,
                                day: d.day,
                                month: d.month,
                                isCompleted: d.isCompleted
                            }))
                        });
                    });
                });
                setSchedules(formattedSchedules);
            } catch (err) {
                console.error("Error fetching schedules:", err);
            }
        };
        if (id) {
            fetchSchedules();
        }
    }, [id]);

    useEffect(() => {
        const fetchGroupDetails = async () => {
            try {
                const res = await api.get(`/groups/one/${id}`);
                setGroupDetails(res.data.data || res.data);
            } catch (err) {
                console.error("Error fetching group details:", err);
            }
        };
        if (id) {
            fetchGroupDetails();
        }
    }, [id]);
    
    const tabIndex = searchParams.get("tab") || "0";
    let activeTab = "Ma'lumotlar";
    if (tabIndex === "1") activeTab = "Guruh darsliklari";
    if (tabIndex === "2") activeTab = "Akademik davomati";

    const [activeSubTab, setActiveSubTab] = useState("Uyga vazifa");
    const [showAllSchedules, setShowAllSchedules] = useState(false);

    const handleTabChange = (index) => {
        setSearchParams({ tab: index });
    };

    const dayTranslations = {
        MONDAY: "Du",
        TUESDAY: "Se",
        WEDNESDAY: "Ch",
        THURSDAY: "Pa",
        FRIDAY: "Ju",
        SATURDAY: "Sha",
        SUNDAY: "Yak"
    };
    const translateDays = (days) => {
        if (!days || !Array.isArray(days)) return "";
        return days.map(d => dayTranslations[d] || d).join("/");
    };

    const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return "";
        const months = ["Yan", "Fev", "Mar", "Apr", "May", "Iyun", "Iyul", "Avg", "Sen", "Okt", "Noy", "Dek"];
        const day = String(date.getDate()).padStart(2, '0');
        return `${day} ${months[date.getMonth()]}, ${date.getFullYear()}`;
    };

    const calculateEndTime = (timeStr, hoursToAdd = 2) => {
        if (!timeStr) return "";
        const parts = timeStr.split(":");
        const hours = parseInt(parts[0], 10) || 0;
        const minutes = parseInt(parts[1], 10) || 0;
        const date = new Date();
        date.setHours(hours + hoursToAdd, minutes);
        if (isNaN(date.getTime())) return "";
        const endHours = String(date.getHours()).padStart(2, '0');
        const endMinutes = String(date.getMinutes()).padStart(2, '0');
        return `${endHours}:${endMinutes}`;
    };

    const calculateEndDate = (dateStr, monthsToAdd) => {
        if (!dateStr) return "";
        const date = new Date(dateStr);
        if (isNaN(date.getTime())) return "";
        const parsedMonths = parseInt(monthsToAdd, 10) || 0;
        date.setMonth(date.getMonth() + parsedMonths);
        return date.toISOString(); // Format back to ISO so formatDate can parse it
    };

    // Fake data for tabs that don't have API yet
    const fakeGroupData = {
        lessons: [
            { id: 1, number: 1, title: "HTML elementlari va teglari", type: "Dars", date: "15 Yan, 2026 // 09:30" },
            { id: 2, number: 2, title: "CSS selectors", type: "Dars", date: "17 Yan, 2026 // 09:30" },
            { id: 3, number: 3, title: "Flexbox layout model", type: "Dars", date: "20 Yan, 2026 // 09:30" },
            { id: 4, number: 4, title: "Git and Github", type: "Dars", date: "22 Yan, 2026 // 09:30" },
            { id: 5, number: 5, title: "Javascript basics", type: "Dars", date: "25 Yan, 2026 // 09:30" }
        ],
        calendarDays: [
            { id: 1, day: 2, month: "May", active: true },
            { id: 2, day: 5, month: "May", active: true },
            { id: 3, day: 7, month: "May", active: true },
            { id: 4, day: 9, month: "May", active: true },
            { id: 5, day: 12, month: "May", active: true },
            { id: 6, day: 14, month: "May", active: true },
            { id: 7, day: 16, month: "May", active: true },
            { id: 8, day: 19, month: "May", active: true },
            { id: 9, day: 21, month: "May", active: true },
            { id: 10, day: 23, month: "May", active: true },
            { id: 11, day: 26, month: "May", active: true },
            { id: 12, day: 28, month: "May", active: true },
            { id: 13, day: 30, month: "May", active: true }
        ]
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.headerTitle}>
                    <button className={styles.backBtn} onClick={() => navigate("/dashboard/groups")}>
                        <ArrowBackIosNewRoundedIcon fontSize="small" />
                    </button>
                    <h1>{groupDetails?.name || ""}</h1>
                    <span className={styles.statusTag}>{groupDetails?.status || "Aktiv"}</span>
                </div>
                <button className={styles.statsBtn}>
                    <AssessmentOutlinedIcon fontSize="small" />
                    Statistika
                </button>
            </div>

            <div className={styles.tabs}>
                <button 
                    className={`${styles.tab} ${activeTab === "Ma'lumotlar" ? styles.activeTab : ""}`}
                    onClick={() => handleTabChange("0")}
                >
                    Ma'lumotlar
                </button>
                <button 
                    className={`${styles.tab} ${activeTab === "Guruh darsliklari" ? styles.activeTab : ""}`}
                    onClick={() => handleTabChange("1")}
                >
                    Guruh darsliklari
                </button>
                <button 
                    className={`${styles.tab} ${activeTab === "Akademik davomati" ? styles.activeTab : ""}`}
                    onClick={() => handleTabChange("2")}
                >
                    Akademik davomati
                </button>
            </div>

            {activeTab === "Ma'lumotlar" && (
                <>
                    <div className={styles.content}>
                        <div className={styles.mentorsCard}>
                            <div className={styles.cardHeader}>
                                <h3>Mentors</h3>
                            </div>
                            <div className={styles.cardBody}>
                                {(groupDetails?.teachers || []).map((mentor, index) => (
                                    <div key={mentor.id || index} className={styles.mentorItem}>
                                        <img 
                                            src={mentor.image || `https://ui-avatars.com/api/?name=${mentor.full_name || mentor.name || 'MO'}&background=f8fafc&color=3b82f6&size=128`} 
                                            alt={mentor.full_name || mentor.name} 
                                            className={styles.mentorAvatar} 
                                        />
                                        <span className={styles.mentorRole}>Teacher</span>
                                        <span className={styles.mentorName}>{mentor.full_name || mentor.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className={styles.parametersCard}>
                            <div className={styles.cardHeader}>
                                <h3>Guruh parametrlari</h3>
                            </div>
                            <div className={styles.cardBody}>
                                <div className={styles.paramRow}>
                                    <span>Yo'nalish</span>
                                    <strong>{groupDetails?.course?.name || ""}</strong>
                                </div>
                                <div className={styles.paramRow}>
                                    <span>O'rtacha yosh</span>
                                    <strong>{groupDetails?.averageAge || "21"} yosh</strong>
                                </div>
                                <div className={styles.paramRow}>
                                    <span>Sig'imi</span>
                                    <strong>{groupDetails?.capacity || "20"} ta</strong>
                                </div>
                                <div className={styles.paramRow}>
                                    <span>Hozirgi o'quvchilar</span>
                                    <strong>{groupDetails?.student_count ?? "0"} ta</strong>
                                </div>
                                <div className={styles.paramRow}>
                                    <span>Darslar soni (1 oyda)</span>
                                    <strong>{schedules.length > 0 ? Math.round(schedules.reduce((sum, m) => sum + m.days.length, 0) / schedules.length) : "0"} ta</strong>
                                </div>
                                <div className={styles.paramRow}>
                                    <span>Kurs davomiyligi</span>
                                    <strong>{groupDetails?.course?.duration_month ?? "0"} oy</strong>
                                </div>
                                <div className={styles.paramRow}>
                                    <span>Darslar soni (Jami)</span>
                                    <strong>{schedules.reduce((sum, m) => sum + m.days.length, 0)} ta</strong>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.scheduleSection}>
                        <h2>Dars jadvali</h2>
                        <div className={styles.scheduleList}>
                            {(() => {
                                const teachersList = groupDetails?.teachers?.length > 0 ? groupDetails.teachers : (groupDetails ? [{ id: 'unknown', full_name: "Noma'lum" }] : []);
                                const displayedTeachers = showAllSchedules ? teachersList : teachersList.slice(0, 2);
                                
                                return displayedTeachers.map((teacher, index) => {
                                    const item = {
                                        id: `${groupDetails?.id || 'g'}-${teacher.id || index}`,
                                        teacher: teacher.full_name || teacher.name || "Noma'lum",
                                        days: translateDays(groupDetails?.week_day),
                                        time: groupDetails?.start_time ? `${groupDetails.start_time} dan - ${calculateEndTime(groupDetails.start_time, 2)} gacha` : "",
                                        period: groupDetails?.start_date ? `${formatDate(groupDetails.start_date)} - ${formatDate(calculateEndDate(groupDetails.start_date, groupDetails.course?.duration_month))}` : "",
                                        room: groupDetails?.room || "Noma'lum"
                                    };
                                    return (
                                        <div key={item.id} className={styles.scheduleItem}>
                                            <span className={styles.teacherName}>{item.teacher}</span>
                                            <div className={styles.scheduleDetails}>
                                                <span>{item.days}</span>
                                                <span>{item.time}</span>
                                                <span>{item.period}</span>
                                                <span>{item.room}</span>
                                            </div>
                                        </div>
                                    );
                                });
                            })()}
                        </div>

                        {groupDetails?.teachers?.length > 2 && (
                            <div className={styles.showMoreBtnWrapper}>
                                <button 
                                    className={styles.showMoreBtn}
                                    onClick={() => setShowAllSchedules(!showAllSchedules)}
                                >
                                    {showAllSchedules ? "Yashirish" : `Yana ko'rsatish (${groupDetails.teachers.length - 2})`}
                                </button>
                            </div>
                        )}

                        {/* Month navigation */}
                        <div className={styles.monthNav}>
                            <button 
                                className={styles.monthNavBtn} 
                                onClick={() => setCurrentMonth(Math.max(0, currentMonth - 1))}
                                disabled={currentMonth === 0}
                            >
                                <KeyboardArrowLeftRoundedIcon fontSize="small" />
                            </button>
                            <span className={styles.monthNavLabel}>
                                {schedules[currentMonth]?.label || ""}
                            </span>
                            <button 
                                className={styles.monthNavBtn} 
                                onClick={() => setCurrentMonth(Math.min(schedules.length - 1, currentMonth + 1))}
                                disabled={currentMonth >= schedules.length - 1 || schedules.length === 0}
                            >
                                <KeyboardArrowRightRoundedIcon fontSize="small" />
                            </button>
                        </div>

                        {/* Study months and calendar */}
                        {(showAllMonths ? schedules : schedules.slice(currentMonth, currentMonth + 1)).map((studyMonth, idx) => (
                            <div key={idx} className={styles.studyMonthBlock}>
                                <div className={styles.studyMonthHeader}>
                                    <span className={styles.studyMonthLabel}>{studyMonth.label}</span>
                                    {studyMonth.isCurrent && (
                                        <span className={styles.currentMonthBadge}>Joriy oy</span>
                                    )}
                                </div>
                                <div className={styles.calendarDaysRow}>
                                    {studyMonth.days.map(item => (
                                        <div key={item.id} className={styles.calendarChip}>
                                            <span className={styles.chipMonth}>{item.month}</span>
                                            <span className={styles.chipDay}>{item.day}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}

                        {schedules.length > 1 && (
                            <div className={styles.showAllBtnWrapper}>
                                <button 
                                    className={styles.showAllBtn} 
                                    onClick={() => setShowAllMonths(!showAllMonths)}
                                >
                                    {showAllMonths ? 'Yopish' : 'Barchasini ko\'rish'}
                                </button>
                            </div>
                        )}
                    </div>
                </>
            )}

            {activeTab === "Guruh darsliklari" && (
                <div className={styles.lessonsSection}>
                    <div className={styles.lessonsHeader}>
                        <div className={styles.lessonsTabsAndTitle}>
                            <h2>Darslar</h2>
                            <div className={styles.subTabs}>
                                <button 
                                    className={`${styles.subTab} ${activeSubTab === "Darslik" ? styles.activeSubTab : ""}`}
                                    onClick={() => setActiveSubTab("Darslik")}
                                >
                                    Darslik
                                </button>
                                <button 
                                    className={`${styles.subTab} ${activeSubTab === "Uyga vazifa" ? styles.activeSubTab : ""}`}
                                    onClick={() => setActiveSubTab("Uyga vazifa")}
                                >
                                    Uyga vazifa
                                </button>
                            </div>
                        </div>
                        
                        {activeSubTab === "Uyga vazifa" && (
                            <button 
                                className={styles.addLessonBtn}
                                onClick={() => navigate(`/dashboard/groups/${id}/homework/create`)}
                            >
                                Yangi vazifa qo'shish
                            </button>
                        )}
                    </div>

                    <div className={styles.tableCard}>
                        <table className={styles.lessonsTable}>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Mavzu nomi</th>
                                    <th>Tur</th>
                                    <th>Qo'shilgan sana va vaqt</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {fakeGroupData.lessons.map((lesson, idx) => (
                                    <tr key={lesson.id}>
                                        <td>{idx + 1}</td>
                                        <td className={styles.lessonTitle}>{lesson.title}</td>
                                        <td>{lesson.type}</td>
                                        <td className={styles.timeCell}>{lesson.date}</td>
                                        <td><MoreVertRoundedIcon className={styles.moreIcon} /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {activeTab === "Akademik davomati" && (
                <div className={styles.scheduleSection}>
                    <div className={styles.monthNavigator}>
                        <button className={styles.navBtn}>
                            <KeyboardArrowLeftRoundedIcon />
                        </button>
                        <span className={styles.monthText}>May 2026</span>
                        <button className={styles.navBtn}>
                            <KeyboardArrowRightRoundedIcon />
                        </button>
                    </div>

                    <div className={styles.calendarList}>
                        {fakeGroupData.calendarDays.map(item => (
                            <div key={item.id} className={`${styles.calendarDay} ${item.active ? styles.activeDay : ""}`}>
                                <span className={styles.month}>{item.month}</span>
                                <span className={styles.day}>{item.day}</span>
                            </div>
                        ))}
                    </div>

                    <div className={styles.showAllBtnWrapper}>
                        <button className={styles.showAllBtn}>Barchasini ko'rish</button>
                    </div>
                </div>
            )}
        </div>
    );
}
