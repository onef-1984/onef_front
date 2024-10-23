import useCommentsAdaptor from "@/hooks/useAdaptor/useCommentsAdaptor";
import CommentBox from "./CommentBox";
import styles from "./CommentContainer.module.css";
import Map from "../util/Map";

export default function CommentContainer({ id }: { id: string }) {
  const { comments } = useCommentsAdaptor(id);

  return (
    <div className={styles.root}>
      <Map each={comments}>
        {(item) => {
          return <CommentBox key={item.id} commentData={item} />;
        }}
      </Map>
    </div>
  );
}
