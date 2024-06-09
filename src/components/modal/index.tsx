import { ReactNode } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import Button from "../button";
import styles from "./index.module.css";
type IProps = {
  open: boolean | number;
  setOpen: (val: boolean | number) => void;
  title: string;
  description?: string;
  children?: ReactNode;
  handleSubmit: () => void;
};

const Modal: React.FC<IProps> = ({
  open,
  setOpen,
  title,
  description,
  children,
  handleSubmit,
}) => {
  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };
  const handleClose = () => {
    setOpen(false);
  };
  if (!open) {
    return null;
  }
  return (
    <div className={styles.modalOverlay} onClick={handleClose}>
      <div className={styles.modal} onClick={handleModalClick}>
        <div className={styles.modalHeader}>
          <div>
            <p className={styles.heading}>{title}</p>
            {description && <p className={styles.descriptoin}>{description}</p>}
          </div>
          <IoMdCloseCircleOutline size={24} onClick={handleClose} />
        </div>
        <div className={styles.modalBody}>{children}</div>
        <div className={styles.modalFooter}>
          <Button title="Cancel" onClick={handleClose} />
          <Button title="Save" onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default Modal;
