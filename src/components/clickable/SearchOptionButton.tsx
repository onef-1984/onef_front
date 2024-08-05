import { usePopUpToggle } from "@/hooks/usePopUpToggle";
import PopUp from "../popUp/PopUp";
import SearchOptionPop from "../popUp/SearchOptionPop";
import { IoMdOptions } from "react-icons/io";
import styles from "./SearchOptionButton.module.css";

export default function SearchOptionButton() {
  const { toggle, handleToggle } = usePopUpToggle();

  return (
    <div className={styles.root}>
      <button className={styles.optionButton} type="button" onClick={handleToggle}>
        <IoMdOptions />
      </button>

      {toggle && (
        <PopUp position="right">
          <SearchOptionPop />
        </PopUp>
      )}
    </div>
  );
}
