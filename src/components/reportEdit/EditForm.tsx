import styles from "./EditForm.module.css";
import Button from "@/components/clickable/Button";
import Input from "@/components/forms/Input";
import DoubleButton from "@/components/clickable/DoubleButton";
import Form from "@/components/forms/Form";
import MarkdownEditor from "@/components/forms/MarkdownEditor";
import { handleSubmit, initValue, register, setValue } from "@/hooks/useSicilian/report";
import TagInputWrapper from "@/components/forms/TagInputWrapper";
import { useReportTagList } from "@/hooks/useCaroKann/useReportTagList";
import { useRouter } from "next/router";
import { useContext } from "react";
import { MutationContext } from "@/hooks/useContext/useMutationContext";

export default function EditForm() {
  const [tagList, setTagList] = useReportTagList();
  const { back } = useRouter();
  const mutate = useContext(MutationContext);

  return (
    <Form
      className={styles.form}
      onSubmit={handleSubmit((data) => {
        mutate({ ...data, tags: tagList });
      })}
      inputWrapper={
        <>
          <Input {...register("title")} placeholder={"제목을 입력해 주세요"} />
          <MarkdownEditor {...register("content")} />
          <TagInputWrapper
            tagList={tagList}
            setTagList={setTagList}
            value={register("tags").value}
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
            <Button
              type="button"
              color="white"
              onClick={() => {
                back();
                setTagList([]);
                setValue(initValue);
              }}
            >
              취소
            </Button>
          }
          button2={<Button>저장</Button>}
        />
      }
    />
  );
}
