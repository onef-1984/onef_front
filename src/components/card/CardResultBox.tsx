import { Item } from "@/types/graphql.types";
import styles from "./CardResultBox.module.css";

export default function CardResultBox({ title, author, description }: Pick<Item, "title" | "author" | "description">) {
  return (
    <div className={styles.describe}>
      <div>
        <p className={styles.title}>{title}</p>
        <p className={styles.author}>{author}</p>
      </div>
      <div>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
}
