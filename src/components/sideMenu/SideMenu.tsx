import { useSideMenuToggle } from "@/hooks/useCaroKann/useSideMenuToggle";
import styles from "./SideMenu.module.css";
import clsx from "clsx";
import { IoClose } from "react-icons/io5";

export default function SideMenu() {
  const [toggle, setToggle] = useSideMenuToggle();

  return (
    <aside className={clsx(styles.root, toggle && styles.open)}>
      <button type="button" className={styles.closeButton} onClick={() => setToggle((prev) => !prev)}>
        <IoClose style={{ fontSize: "2.55rem" }} />
      </button>

      <menu style={{ marginTop: "8rem" }}>a</menu>
    </aside>
  );
}
