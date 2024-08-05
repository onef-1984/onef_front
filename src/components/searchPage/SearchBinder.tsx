import CardReport from "../card/CardReport";
import styles from "./Search.module.css";

export default function SearchBinder({ items }: { items: Array<any> }) {
  return (
    <div className={styles.binderContainer}>
      <div className={styles.searchBinder}>
        {items.map((item) => (
          <CardReport
            key={`${item.id}+${item.title}`}
            user={item.user.nickname}
            likeCount={item._count.userLiked}
            id={item.id}
            title={item.title}
            bookTitle={item.book.title}
            cover={item.book.cover}
            content={item.content}
          />
        ))}
      </div>
    </div>
  );
}
