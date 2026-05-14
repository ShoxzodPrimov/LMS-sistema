import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";
import styles from "./Dashboard.module.scss";

export default function Dashboard() {
    return (
        <div className={styles.layout}>
            <Sidebar />
            <div className={styles.main}>
                <Header />
                <div className={styles.content}>
                    {/* Asosiy kontent shu yerga tushadi */}
                </div>
            </div>
        </div>
    );
}