import Popover from "../popover/Popover";
import optionImg from "@/../public/images/option.png";
import Image from "next/image";
import styles from "./SearchOptionButton.module.css";

export default function SearchOptionButton() {
  return (
    <Popover position="right" id="Profile" className={styles.optionButton} popover={<Popover.SearchOption />}>
      {(id: string) => (
        <Image id={id} src={optionImg} alt="option 버튼 이미지" width={16} height={16} draggable="false" />
      )}
    </Popover>
  );
}
