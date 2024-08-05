import { usePopUpToggle } from "@/hooks/usePopUpToggle";
import PopUp from "../popUp/PopUp";
import SearchOptionPop from "../popUp/SearchOptionPop";
import styles from "./SearchOptionButton.module.css";
import optionImg from "@/../public/images/option.png";
import Image from "next/image";

export default function SearchOptionButton() {
  const { toggle, handleToggle } = usePopUpToggle();

  return (
    <div className={styles.root}>
      <button className={styles.optionButton} type="button" onClick={handleToggle}>
        <Image src={optionImg} alt="option 버튼 이미지" width={16} height={16} />
      </button>

      {toggle && (
        <PopUp position="right">
          <SearchOptionPop />
        </PopUp>
      )}
    </div>
  );
}
