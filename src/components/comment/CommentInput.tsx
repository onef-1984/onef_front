import { useContext, useState } from "react";
import Clickable from "../clickable/Clickable";
import Form from "../forms/Form";
import InputWrapper from "../forms/InputWrapper";
import Textarea from "../forms/Textarea";
import styles from "./CommentInput.module.css";
import useCommentMutation from "@/hooks/useMutation/useCommentMutation";
import { CommentMutationContext } from "@/hooks/useContext/useCommentMutationContext";
import { useGetTextAreaHeight } from "@/hooks/useGetTextAreaHeight";

export default function CommentInput({ initValue }: { initValue?: string }) {
  const [value, setValue] = useState(initValue ?? "");
  const { textRef, handleInput } = useGetTextAreaHeight(initValue ?? "");
  const { inputName, buttonName } = useContext(CommentMutationContext);
  const { handleSubmit, isPending } = useCommentMutation({ value, setValue });

  return (
    <Form
      onSubmit={handleSubmit}
      className={styles.root}
      inputWrapper={
        <InputWrapper inputName={inputName}>
          <Textarea
            ref={textRef}
            name="댓글"
            placeholder="댓글을 입력해주세요"
            className={styles.comment_textarea}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onInput={handleInput}
          />
        </InputWrapper>
      }
      button={
        <Clickable size="small" disabled={isPending} className={styles.button}>
          {buttonName}
        </Clickable>
      }
    />
  );
}
