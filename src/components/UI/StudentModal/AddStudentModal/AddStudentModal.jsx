import React, { useState } from "react";
import styles from "./AddStudentModal.module.scss";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import AddGroupModal from "../../TeacherModal/AddGroupModal/AddGroupModal";

export default function AddStudentModal({ onClose, onSave }) {
    const [isAddGroupModalOpen, setIsAddGroupModalOpen] = useState(false);

    const toggleAddGroupModal = () => setIsAddGroupModalOpen(!isAddGroupModalOpen);

    return (
        <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.header}>
                <div className={styles.headerText}>
                    <h2 className={styles.title}>Talaba qo'shish</h2>
                    <p className={styles.subtitle}>Bu yerda siz yangi Talaba qo'shishingiz mumkin.</p>
                </div>
                <button className={styles.closeBtn} onClick={onClose}>
                    <CloseRoundedIcon />
                </button>
            </div>

            <div className={styles.body}>
                <div className={styles.formGroup}>
                    <input type="text" placeholder="Ma'lumotni kiriting" />
                </div>

                <div className={styles.formGroup}>
                    <label>Tug'ilgan sanasi</label>
                    <div className={styles.dateInputWrapper}>
                        <input type="date" placeholder="dd/mm/yyyy" />
                    </div>
                </div>

                <div className={styles.formGroup}>
                    <label>Manzil</label>
                    <input type="text" placeholder="Manzilni kiriting" />
                </div>

                <div className={styles.formGroup}>
                    <label>Parol</label>
                    <input type="password" placeholder="Parolni kiriting" />
                </div>

                <div className={styles.formGroup}>
                    <label>Guruh</label>
                    <button className={styles.addGroupBtn} onClick={toggleAddGroupModal}>
                        <AddRoundedIcon fontSize="small" />
                        <span>Guruh qo'shish</span>
                    </button>
                </div>

                <div className={styles.formGroup}>
                    <label>Surati</label>
                    <div className={styles.uploadArea}>
                        <CloudUploadOutlinedIcon className={styles.uploadIcon} />
                        <p className={styles.uploadText}>
                            <span className={styles.purpleText}>Click to upload</span> or drag and drop
                        </p>
                        <p className={styles.uploadHint}>JPG or PNG (max. 2 MB)</p>
                    </div>
                </div>
            </div>

            <div className={styles.footer}>
                <div className={styles.footerButtons}>
                    <button className={styles.cancelBtn} onClick={onClose}>Bekor qilish</button>
                    <button className={styles.saveBtn} onClick={onSave}>Saqlash</button>
                </div>
                <div className={styles.logoWrapper}>
                    <svg width="60" height="60" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M50 20L80 35V65L50 80L20 65V35L50 20Z" stroke="#D4AF37" strokeOpacity="0.2" strokeWidth="1" />
                        <path d="M50 30L70 40V60L50 70L30 60V40L50 30Z" stroke="#D4AF37" strokeOpacity="0.2" strokeWidth="1" />
                        <path d="M50 40L60 45V55L50 60L40 55V45L50 40Z" fill="#D4AF37" fillOpacity="0.1" />
                    </svg>
                </div>
            </div>

            <AddGroupModal 
                isOpen={isAddGroupModalOpen} 
                onClose={toggleAddGroupModal} 
                onAdd={() => {
                    console.log("Groups added to student");
                    toggleAddGroupModal();
                }}
            />
        </div>
    );
}
