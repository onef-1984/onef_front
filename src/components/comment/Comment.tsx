import { CommentMutationContext } from "@/hooks/useContext/useCommentMutationContext";
import { useIsLogin } from "@/hooks/useIsLogin";
import { useState, Dispatch, SetStateAction, ReactNode, useEffect } from "react";
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
import Show from "../util/Show";
import Map from "../util/Map";
import ProfileImage from "../Profile/ProfileImage";
import useCommentsAdaptor from "@/hooks/useAdaptor/useCommentsAdaptor";
import styles from "./Comment.module.css";

type CommentBoxType = "viewer" | "editor";

const clickableProps = { type: "button", size: "small", color: "borderless", className: styles.button } as const;

export default function Comment({ id, depth }: { id: string; depth: number }) {
  const commentMutation = new CommentMutation();

  return (
    <div className={styles.root}>
      <CommentMutationContext.Provider
        value={{
          parentId: id,
          mutationFn: commentMutation.postComment,
        }}
      >
        <Comment.Input depth={depth} inputName="댓글" buttonName="저장" />
      </CommentMutationContext.Provider>

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
  const isLogin = useIsLogin();
  const { onSubmit, isPending } = useCommentMutation({ initValue, depth });
  const { handleSubmit, register, setForm } = useDragon({
    initValue: { comment: "" },
    validator: {
      comment: { required: true },
    },
    validateOn: ["submit"],
    clearFormOn: ["routeChange", "submit"],
  });

  useEffect(() => {
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
  const [commentState, setCommentState] = useState<CommentBoxType>("viewer");
  const commentMutation = new CommentMutation();
  const [open, setOpen] = useState(false);

  switch (commentState) {
    case "viewer":
      return (
        <>
          <Comment.Viewer setOpen={setOpen} depth={depth} commentData={commentData} setCommentState={setCommentState} />

          <Show when={open}>
            <div style={{ marginLeft: "5rem" }}>
              <CommentMutationContext.Provider
                value={{
                  mutationFn: commentMutation.postComment,
                  parentId: commentData.id,
                  onSuccessBehavior: () => {
                    setOpen(false);
                  },
                }}
              >
                <Comment.Input depth={depth + 1} buttonName="저장" inputName="답글" />
              </CommentMutationContext.Provider>
            </div>
          </Show>
        </>
      );

    case "editor":
      return (
        <CommentMutationContext.Provider
          value={{
            mutationFn: commentMutation.putComment,
            parentId: commentData.id,
            onSuccessBehavior: () => {
              setCommentState("viewer");
            },
          }}
        >
          <Comment.Input depth={depth} initValue={commentData.comment} buttonName="수정" inputName="" />
        </CommentMutationContext.Provider>
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
  setOpen: Dispatch<SetStateAction<boolean>>;
  setCommentState: Dispatch<SetStateAction<CommentBoxType>>;
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
  children: ReactNode;
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
