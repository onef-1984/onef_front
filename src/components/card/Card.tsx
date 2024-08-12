import { Item } from "@/types/book.types";
import styles from "./Card.module.css";
import Image from "next/image";

export default function Card({
  onClick,
  item,
  cardBox,
}: {
  onClick?: () => void;
  item: Omit<Item, "priceStandard" | "subInfo">;
  cardBox: React.ReactNode;
}) {
  return (
    <button type="button" className={styles.root} onClick={onClick}>
      <div className={styles.imageWrapper}>
        <Image fill sizes="33vw" src={item.cover} alt={`${item.title} 표지`} draggable="false" />
      </div>

      {cardBox}
    </button>
  );
}
