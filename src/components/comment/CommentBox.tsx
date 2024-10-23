import { ReportComment } from "@/types/comment.types";
import ProfileImage from "../Profile/ProfileImage";
import styles from "./CommentBox.module.css";
import Clickable from "../clickable/Clickable";
import { Dispatch, SetStateAction, useState } from "react";
import { CommentMutationContext } from "@/hooks/useContext/useCommentMutationContext";
import { CommentMutation } from "@/apis/reactQuery/Mutation/CommentMutation";
import CommentInput from "./CommentInput";
import { useDeleteCommentMutation } from "@/hooks/useMutation/useDeleteCommentMutation";
import Show from "../util/Show";
import { useWhoAmIAdaptor } from "@/hooks/useAdaptor/user/useWhoAmIAdaptor";

type CommentBoxType = "viewer" | "editor";

export default function CommentBox({ commentData }: { commentData: ReportComment }) {
  const [commentState, setCommentState] = useState<CommentBoxType>("viewer");

  switch (commentState) {
    case "viewer":
      return <CommentViewer commentData={commentData} setCommentState={setCommentState} />;

    case "editor":
      return <CommentEditor id={commentData.id} comment={commentData.comment} setCommentState={setCommentState} />;

    default:
      return <></>;
  }
}

const CommentEditor = ({
  id,
  comment,
  setCommentState,
}: {
  id: string;
  comment: string;
  setCommentState: Dispatch<SetStateAction<CommentBoxType>>;
}) => {
  const commentMutation = new CommentMutation();

  return (
    <CommentMutationContext.Provider
      value={{
        mutationFn: commentMutation.putComment,
        parentId: id,
        depth: 1,
        buttonName: "수정",
        inputName: "",
        onSuccessBehavior: () => {
          setCommentState("viewer");
        },
      }}
    >
      <CommentInput initValue={comment} />
    </CommentMutationContext.Provider>
  );
};

const CommentViewer = ({
  commentData,
  setCommentState,
}: {
  commentData: ReportComment;
  setCommentState: Dispatch<SetStateAction<CommentBoxType>>;
}) => {
  const clickableProps = { type: "button", size: "small", color: "borderless", className: styles.button } as const;
  const { handleClick } = useDeleteCommentMutation(commentData.id);
  const { user } = useWhoAmIAdaptor();

  return (
    <div className={styles.root} id={commentData.id}>
      <div className={styles.image}>
        <ProfileImage profileImage={commentData.user.profileImage} size={40} />
      </div>
      <div className={styles.box}>
        <p className={styles.nickname}>{commentData.user.nickname}</p>

        <p>{commentData.comment}</p>

        <div className={styles.button}>
          <Show when={user.id === commentData.user.id}>
            <Clickable
              {...clickableProps}
              onClick={() => {
                setCommentState("editor");
              }}
            >
              수정
            </Clickable>

            <Clickable {...clickableProps} onClick={handleClick}>
              삭제
            </Clickable>
          </Show>
        </div>
      </div>
    </div>
  );
};
