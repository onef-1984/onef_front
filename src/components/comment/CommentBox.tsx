import { ReportComment } from "@/types/comment.types";
import { Dispatch, ReactNode, SetStateAction, useState } from "react";
import { CommentMutationContext } from "@/hooks/useContext/useCommentMutationContext";
import { CommentMutation } from "@/apis/reactQuery/Mutation/CommentMutation";
import { useDeleteCommentMutation } from "@/hooks/useMutation/useDeleteCommentMutation";
import { useWhoAmIAdaptor } from "@/hooks/useAdaptor/user/useWhoAmIAdaptor";
import ProfileImage from "../Profile/ProfileImage";
import styles from "./CommentBox.module.css";
import Clickable from "../clickable/Clickable";
import CommentInput from "./CommentInput";
import Show from "../util/Show";
import CommentContainer from "./CommentContainer";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import clsx from "clsx";

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

const clickableProps = { type: "button", size: "small", color: "borderless", className: styles.button } as const;

const CommentViewer = ({
  commentData,
  setCommentState,
}: {
  commentData: ReportComment;
  setCommentState: Dispatch<SetStateAction<CommentBoxType>>;
}) => {
  const { handleClick } = useDeleteCommentMutation(commentData.id);
  const { user } = useWhoAmIAdaptor();
  const [open, setOpen] = useState(false);

  return (
    <>
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

            <Show when={!commentData.parentId}>
              <Clickable
                {...clickableProps}
                onClick={() => {
                  setOpen(open ? false : true);
                }}
              >
                댓글
              </Clickable>
            </Show>
          </div>
        </div>
      </div>

      <CommentReplyInput commentData={commentData} open={open} setOpen={setOpen} />

      <CommentReplyBox commentData={commentData}>
        <CommentContainer id={commentData.id} />
      </CommentReplyBox>
    </>
  );
};

const CommentReplyInput = ({
  commentData,
  open,
  setOpen,
}: {
  commentData: ReportComment;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const commentMutation = new CommentMutation();

  return (
    <Show when={open}>
      <div style={{ marginLeft: "5rem" }}>
        <CommentMutationContext.Provider
          value={{
            mutationFn: commentMutation.postComment,
            parentId: commentData.id,
            depth: 1,
            buttonName: "저장",
            inputName: "",
            onSuccessBehavior: () => {
              setOpen(false);
            },
          }}
        >
          <CommentInput />
        </CommentMutationContext.Provider>
      </div>
    </Show>
  );
};

const CommentReplyBox = ({ commentData, children }: { commentData: ReportComment; children: ReactNode }) => {
  const [open, setOpen] = useState(false);

  return (
    <Show when={commentData.replies.length !== 0}>
      <div style={{ marginLeft: "5rem", display: "flex", flexDirection: "column", gap: "2rem" }}>
        <Clickable
          {...clickableProps}
          className={clsx(clickableProps.className, styles.replyButton)}
          onClick={() => {
            setOpen(open ? false : true);
          }}
        >
          <Show
            when={open}
            fallback={
              <>
                <IoIosArrowUp /> 답글 {commentData.replies.length}개
              </>
            }
          >
            <IoIosArrowDown /> 접기
          </Show>
        </Clickable>

        <Show when={open}>{children}</Show>
      </div>
    </Show>
  );
};
