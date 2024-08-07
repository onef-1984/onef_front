import { createPortal } from "react-dom";
import { MouseEvent, ReactNode } from "react";
import styles from "./ModalWrapper.module.css";
import { MdClose } from "@react-icons/all-files/md/MdClose";
import clsx from "clsx";

type ModalProps = {
  children: ReactNode;
  onClose: () => void;
  size: string;
};

export default function ModalWrapper({ children, onClose, size }: ModalProps) {
  const handleModalOutSideClick = (e: MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleModalCloseButtonClick = () => {
    onClose();
  };

  return createPortal(
    <div className={styles.root} onClick={handleModalOutSideClick}>
      <div className={clsx(styles.modal, size)}>
        <button className={styles.closeButton} onClick={handleModalCloseButtonClick}>
          <MdClose />
        </button>

        {children}
      </div>
    </div>,
    document.body
  );
}
