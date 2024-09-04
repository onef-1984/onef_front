import styles from "./EditForm.module.css";
import Input from "@/components/forms/Input";
import DoubleButton from "@/components/clickable/DoubleButton";
import Form from "@/components/forms/Form";
import MarkdownEditor from "@/components/forms/MarkdownEditor";
import { FormState, handleSubmit, initValue, register, setValue } from "@/hooks/useSicilian/report";
import TagInputWrapper from "@/components/forms/TagInputWrapper";
import { useReportTagList } from "@/hooks/useCaroKann/useReportTagList";
import { useContext } from "react";
import { MutationContext } from "@/hooks/useContext/useMutationContext";
import { useRouterAdv } from "@/hooks/useRouterAdv";
import toast from "react-hot-toast";
import Clickable from "../clickable/Clickable";

export default function EditForm() {
  const [tagList, setTagList] = useReportTagList();
  const { back } = useRouterAdv();
  const mutate = useContext(MutationContext);
  const formState = FormState();

  return (
    <Form
      className={styles.form}
      onSubmit={handleSubmit((data) => {
        if (tagList.length > 10) return toast.error("태그는 최대 10개까지 입력 가능합니다.");
        if (data.content.length > 1984) return toast.error("내용은 1984자 이하로 입력해주세요.");
        if (data.content.length < 84) return toast.error("내용은 84자 이상 입력해주세요.");
        if (data.title.length > 19) return toast.error("제목은 19자 이하로 입력해주세요.");
        if (data.title.length < 4) return toast.error("제목은 4자 이상 입력해주세요.");

        mutate({ ...data, tags: tagList });
      })}
      inputWrapper={
        <>
          <Input {...register("title")} placeholder={"제목을 입력해 주세요"} className={styles.title} />
          <MarkdownEditor {...register("content")} />
          <TagInputWrapper
            tagList={tagList}
            setTagList={setTagList}
            value={formState.tags}
            setValue={setValue}
            input={({ handleKeyDown, handleKeyUp }) =>
              Input({
                ...register("tags"),
                onKeyUp: handleKeyUp,
                onKeyDown: handleKeyDown,
                placeholder: "태그 입력 후 엔터를 눌러주세요",
                className: styles.tag,
              })
            }
          />
        </>
      }
      button={
        <DoubleButton
          button1={
            <Clickable
              type="button"
              color="white"
              onClick={() => {
                back();
                setTagList([]);
                setValue(initValue);
              }}
            >
              취소
            </Clickable>
          }
          button2={<Clickable>저장</Clickable>}
        />
      }
    />
  );
}
