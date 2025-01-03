import { CommentMutationProvider } from "@/hooks/useContext/useCommentMutationContext";
import react, { useState } from "react";
import { CommentMutation } from "@/apis/reactQuery/Mutation/CommentMutation";
import { ReportComment } from "@/types/comment.types";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { useWhoAmIAdaptor } from "@/hooks/useAdaptor/user/useWhoAmIAdaptor";
import { useDeleteCommentMutation } from "@/hooks/useMutation/useDeleteCommentMutation";
import { SicilianProvider, useDragon } from "sicilian";
import useCommentMutation from "@/hooks/useMutation/useCommentMutation";
import Clickable from "../clickable/Clickable";
import Form from "../forms/Form";
import clsx from "clsx";
import { Show, Map } from "utilinent";
import ProfileImage from "../Profile/ProfileImage";
import useCommentsAdaptor from "@/hooks/useAdaptor/useCommentsAdaptor";
import styles from "./Comment.module.css";
import { useIsQualified } from "@/hooks/useIsQualified";

type CommentBoxType = "viewer" | "editor";

const clickableProps = { type: "button", size: "small", color: "borderless", className: styles.button } as const;

export default function Comment({ id, depth }: { id: string; depth: number }) {
  const commentMutation = new CommentMutation();

  return (
    <div className={styles.root}>
      <CommentMutationProvider
        value={{
          parentId: id,
          mutationFn: commentMutation.postComment,
        }}
      >
        <Comment.Input depth={depth} inputName="댓글" buttonName="저장" />
      </CommentMutationProvider>

      <Comment.Container depth={depth} id={id} />
    </div>
  );
}

Comment.Container = function CommentContainer({ id, depth }: { id: string; depth: number }) {
  const { comments } = useCommentsAdaptor(id);

  return (
    <div className={styles.containerRoot}>
      <Map each={comments}>
        {(commentData) => {
          return (
            <div key={commentData.id}>
              <Comment.Box key={commentData.id} depth={depth} commentData={commentData} />

              <Comment.ReplyContainer commentData={commentData}>
                <Comment.Container id={commentData.id} depth={depth + 1} />
              </Comment.ReplyContainer>
            </div>
          );
        }}
      </Map>
    </div>
  );
};

Comment.Input = function CommentInput({
  initValue = "",
  depth,
  inputName,
  buttonName,
}: {
  initValue?: string;
  depth: number;
  inputName: string;
  buttonName: string;
}) {
  const isLogin = useIsQualified("login");
  const { onSubmit, isPending } = useCommentMutation({ initValue, depth });
  const { handleSubmit, register, setForm } = useDragon({
    initValue: { comment: "" },
    validator: {
      comment: { required: true },
    },
    validateOn: ["submit"],
    clearFormOn: ["routeChange", "submit"],
  });

  react.useEffect(() => {
    setForm({ comment: initValue });
  }, [initValue]);

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className={styles.inputRoot}>
      <SicilianProvider value={{ register, name: "comment" }}>
        <Form.InputWrapper inputName={inputName}>
          <Form.Textarea
            initValue={initValue}
            placeholder={isLogin ? "댓글을 입력해주세요" : "로그인 후 댓글을 작성할 수 있습니다"}
            className={styles.textarea}
            disabled={!isLogin}
          />
        </Form.InputWrapper>
      </SicilianProvider>

      <Clickable size="small" disabled={!isLogin || isPending} className={styles.button}>
        {buttonName}
      </Clickable>
    </Form>
  );
};

Comment.Box = function CommentBox({ commentData, depth }: { commentData: ReportComment; depth: number }) {
  const [commentState, setCommentState] = react.useState<CommentBoxType>("viewer");
  const commentMutation = new CommentMutation();
  const [open, setOpen] = react.useState(false);

  switch (commentState) {
    case "viewer":
      return (
        <>
          <Comment.Viewer setOpen={setOpen} depth={depth} commentData={commentData} setCommentState={setCommentState} />

          <Show when={open}>
            <div style={{ marginLeft: "5rem" }}>
              <CommentMutationProvider
                value={{
                  mutationFn: commentMutation.postComment,
                  parentId: commentData.id,
                  onSuccessBehavior: () => {
                    setOpen(false);
                  },
                }}
              >
                <Comment.Input depth={depth + 1} buttonName="저장" inputName="답글" />
              </CommentMutationProvider>
            </div>
          </Show>
        </>
      );

    case "editor":
      return (
        <CommentMutationProvider
          value={{
            mutationFn: commentMutation.putComment,
            parentId: commentData.id,
            onSuccessBehavior: () => {
              setCommentState("viewer");
            },
          }}
        >
          <Comment.Input depth={depth} initValue={commentData.comment} buttonName="수정" inputName="" />
        </CommentMutationProvider>
      );
  }
};

Comment.Viewer = function CommentViewer({
  depth,
  commentData,
  setCommentState,
  setOpen,
}: {
  depth: number;
  commentData: ReportComment;
  setOpen: react.Dispatch<react.SetStateAction<boolean>>;
  setCommentState: react.Dispatch<react.SetStateAction<CommentBoxType>>;
}) {
  const { handleClick } = useDeleteCommentMutation(commentData.id);
  const { user } = useWhoAmIAdaptor();

  return (
    <>
      <div className={styles.viewerRoot} id={commentData.id}>
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

            <Show when={depth < 5}>
              <Clickable
                {...clickableProps}
                onClick={() => {
                  setOpen((prev) => (prev ? false : true));
                }}
              >
                댓글
              </Clickable>
            </Show>
          </div>
        </div>
      </div>
    </>
  );
};

Comment.ReplyContainer = function CommentReplyContainer({
  commentData,
  children,
}: {
  commentData: ReportComment;
  children: react.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Show when={commentData.replies.length !== 0}>
      <div className={styles.replyContainerRoot}>
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
