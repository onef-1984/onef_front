import { useContext, useState } from "react";
import Clickable from "../clickable/Clickable";
import Form from "../forms/Form";
import styles from "./CommentInput.module.css";
import useCommentMutation from "@/hooks/useMutation/useCommentMutation";
import { CommentMutationContext } from "@/hooks/useContext/useCommentMutationContext";
import { useGetTextAreaHeight } from "@/hooks/useGetTextAreaHeight";
import { useIsLogin } from "@/hooks/useIsLogin";

export default function CommentInput({ initValue = "" }: { initValue?: string }) {
  const [value, setValue] = useState(initValue);
  const { textRef, handleInput } = useGetTextAreaHeight(initValue);
  const { inputName, buttonName } = useContext(CommentMutationContext);
  const { handleSubmit, isPending } = useCommentMutation({ initValue, value, setValue });
  const isLogin = useIsLogin();

  return (
    <Form onSubmit={handleSubmit} className={styles.root}>
      <Form.InputWrapper inputName={inputName}>
        <Form.Textarea
          ref={textRef}
          name="댓글"
          placeholder={isLogin ? "댓글을 입력해주세요" : "로그인 후 댓글을 작성할 수 있습니다"}
          className={styles.comment_textarea}
          disabled={!isLogin}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onInput={handleInput}
        />
      </Form.InputWrapper>

      <Clickable size="small" disabled={!isLogin || isPending} className={styles.button}>
        {buttonName}
      </Clickable>
    </Form>
  );
}
