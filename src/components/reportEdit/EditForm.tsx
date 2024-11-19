import styles from "./EditForm.module.css";
import Form from "@/components/forms/Form";
import Clickable from "../clickable/Clickable";
import { FormState, ErrorState, handleSubmit, setForm, register } from "@/hooks/useSicilian/report";
import { useReportTagList } from "@/hooks/useCaroKann/useReportTagList";
import { useContext } from "react";
import { MutationContext } from "@/hooks/useContext/useMutationContext";
import { useRouterAdv } from "@/hooks/useRouterAdv";

export default function EditForm() {
  const [tagList, setTagList] = useReportTagList();
  const { back } = useRouterAdv();
  const { id: isbn13 } = useRouterAdv();
  const mutate = useContext(MutationContext);
  const formState = FormState();
  const errorState = ErrorState();

  return (
    <Form
      className={styles.form}
      onSubmit={handleSubmit(({ title, content }) => mutate({ title, content, isbn13: isbn13, tags: tagList }))}
    >
      <Form.Input {...register("title")} placeholder={"제목을 입력해 주세요"} className={styles.titleInput} />
      <p>{errorState.title}</p>

      <Form.MDEditor {...register("content")} />
      <p>{errorState.content}</p>

      <Form.TagInputWrapper
        tagList={tagList}
        setTagList={setTagList}
        value={formState.tags}
        setValue={setForm}
        input={({ onKeyDown, onKeyUp }) =>
          Form.Input({
            ...register("tags"),
            onKeyUp,
            onKeyDown,
            placeholder: "태그 입력 후 엔터를 눌러주세요",
            className: styles.tagInput,
          })
        }
      />

      <Clickable.Container>
        <Clickable
          type="button"
          color="white"
          onClick={() => {
            back();
            setTagList([]);
          }}
        >
          취소
        </Clickable>

        <Clickable>저장</Clickable>
      </Clickable.Container>
    </Form>
  );
}
