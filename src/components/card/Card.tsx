import { useSelectedBook } from "@/hooks/useCaroKann/useSelectedBook";
import { Item } from "@/types/book.types";
import styles from "./Card.module.css";
import Image from "next/image";

export default function Card(item: Omit<Item, "priceStandard" | "subInfo">) {
  const [book, setBook] = useSelectedBook();

  const { title, author, description, cover } = item;

  return (
    <button type="button" className={styles.root} onClick={() => setBook(item)}>
      <div className={styles.imageWrapper}>
        <Image fill sizes="33vw" src={cover} alt={`${title} 표지`} />
      </div>

      <div className={styles.describe}>
        <div>
          <p className={styles.title}>{title}</p>
          <p className={styles.author}>{author}</p>
        </div>
        <div>
          <p className={styles.description}>{description}</p>
        </div>
      </div>
    </button>
  );
}
