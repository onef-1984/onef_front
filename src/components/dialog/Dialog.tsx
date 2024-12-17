import { MdClose } from "@react-icons/all-files/md/MdClose";
import { createRef, MouseEvent, ReactNode, useEffect } from "react";
import styles from "./Dialog.module.css";

export default function Dialog({ children, closeDialog }: { children: ReactNode; closeDialog: () => void }) {
  const handleLightDismiss = (e: MouseEvent) => {
    if ((e.target as HTMLDialogElement).nodeName === "DIALOG") closeDialog();
  };

  const dialogRef = createRef<HTMLDialogElement>();

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) return;

    if (dialog.open) {
      dialog.showModal();
      dialog.scrollTo({ top: 0 });
    }

    return () => {
      dialog.close();
    };
  }, [dialogRef]);

  return (
    <dialog ref={dialogRef} className={styles.root} onClick={handleLightDismiss}>
      <button onClick={closeDialog} className={styles.closeButton}>
        <MdClose />
      </button>

      <>{children}</>
    </dialog>
  );
}
