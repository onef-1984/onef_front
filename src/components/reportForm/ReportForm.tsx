import styles from "./ReportForm.module.css";
import Form from "@/components/forms/Form";
import Clickable from "../clickable/Clickable";
import { FormState, handleSubmit, setForm, register } from "@/hooks/useSicilian/report";
import { useReportTagList } from "@/hooks/useCaroKann/useReportTagList";
import { useRouterAdv } from "@/hooks/useRouterAdv";
import { useReportMutateContext } from "@/hooks/useContext/useMutationContext";
import { SicilianProvider } from "sicilian";
import ValueIndicator from "../valueIndicator/ValueIndicator";

export default function ReportForm() {
  const [tagList, setTagList] = useReportTagList();
  const { back } = useRouterAdv();
  const { id: isbn13 } = useRouterAdv();
  const mutate = useReportMutateContext("ReportForm");

  return (
    <Form
      className={styles.form}
      onSubmit={handleSubmit(({ title, content }) => mutate({ title, content, isbn13: isbn13, tags: tagList }))}
    >
      <SicilianProvider value={{ register, name: "title" }}>
        <div>
          <Form.Input placeholder={"제목을 입력해 주세요"} className={styles.titleInput} />
          <ValueIndicator value={FormState().title.length} limit={19} />
        </div>
      </SicilianProvider>

      <SicilianProvider value={{ register, name: "content" }}>
        <div>
          <Form.MDEditor />
          <ValueIndicator value={FormState().content.length} limit={1984} />
        </div>
      </SicilianProvider>

      <SicilianProvider value={{ register, name: "tags", FormState }}>
        <Form.TagInputWrapper
          tagList={tagList}
          setTagList={setTagList}
          setValue={setForm}
          input={({ onKeyDown, onKeyUp }) =>
            Form.Input({
              onKeyUp,
              onKeyDown,
              placeholder: "태그 입력 후 엔터를 눌러주세요",
              className: styles.tagInput,
            })
          }
        />
      </SicilianProvider>

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
