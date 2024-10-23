import PopUp from "../popUp/PopUp";
import optionImg from "@/../public/images/option.png";
import Image from "next/image";
import styles from "./SearchOptionButton.module.css";

export default function SearchOptionButton() {
  return (
    <PopUp position="right" id="Profile" className={styles.optionButton} popUp={<PopUp.SearchOption />}>
      {(id: string) => (
        <Image id={id} src={optionImg} alt="option 버튼 이미지" width={16} height={16} draggable="false" />
      )}
    </PopUp>
  );
}
