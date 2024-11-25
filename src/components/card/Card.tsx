import { Item } from "@/types/graphql.types";
import styles from "./Card.module.css";
import Image from "next/image";
import { ReactNode } from "react";

export default function Card({ onClick, item, cardBox }: { onClick?: () => void; item: Item; cardBox: ReactNode }) {
  return (
    <button type="button" className={styles.root} onClick={onClick}>
      <div className={styles.imageWrapper}>
        <Image fill sizes="33vw" src={item.cover} alt={`${item.title} 표지`} draggable="false" />
      </div>

      {cardBox}
    </button>
  );
}
