import styles from "./Courses.module.scss";
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import AddRoundedIcon from '@mui/icons-material/AddRounded';

const coursesData = [
    { 
        id: 1, 
        name: "NodeJs", 
        description: "Juda zo'r kurs", 
        durationMin: 300, 
        durationMonth: 8, 
        price: "2 400 000", 
        color: "#E3F2FD" // Light Blue
    },
    { 
        id: 2, 
        name: "React", 
        description: "hgdvchgsdvhcsdf", 
        durationMin: 120, 
        durationMonth: 6, 
        price: "9 000 000", 
        color: "#F3E5F5" // Light Purple
    },
    { 
        id: 3, 
        name: "Web Praktikum", 
        description: "yaxshi", 
        durationMin: 60, 
        durationMonth: 3, 
        price: "1 000 000", 
        color: "#FFF9C4" // Light Yellow
    },
    { 
        id: 4, 
        name: "dcsd", 
        description: "dscsd", 
        durationMin: 60, 
        durationMonth: 1, 
        price: "23 432 5435", 
        color: "#E8F5E9" // Light Green
    },
    { 
        id: 5, 
        name: "Full stack", 
        description: "yaxshi kurs o'qinglar", 
        durationMin: 120, 
        durationMonth: 3, 
        price: "200 000 000", 
        color: "#FCE4EC" // Light Pink
    }
];

export default function Courses() {
    return (
        <div className={styles.coursesContainer}>
            <div className={styles.header}>
                <h2 className={styles.title}>Kurslar</h2>
                <button className={styles.addBtn}>
                    <AddRoundedIcon />
                    Kurslar qo'shish
                </button>
            </div>

            <div className={styles.grid}>
                {coursesData.map((course) => (
                    <div 
                        key={course.id} 
                        className={styles.card} 
                        style={{ backgroundColor: course.color }}
                    >
                        <div className={styles.cardHeader}>
                            <h3 className={styles.courseName}>{course.name}</h3>
                            <div className={styles.actions}>
                                <button className={styles.actionBtn}><DeleteOutlineRoundedIcon /></button>
                                <button className={styles.actionBtn}><EditOutlinedIcon /></button>
                            </div>
                        </div>
                        <p className={styles.description}>{course.description}</p>
                        
                        <div className={styles.details}>
                            <span className={styles.tag}>{course.durationMin} min</span>
                            <span className={styles.tag}>{course.durationMonth} oy</span>
                            <span className={styles.tag}>{course.price}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
