import { FormState, register } from "@/hooks/useSicilian/bookSearch";
import styles from "./BookSearchModal.module.css";
import { Dispatch, FormEventHandler, SetStateAction } from "react";
import Form from "@/components/forms/Form";
import Clickable from "@/components/clickable/Clickable";

type BookSearchFormProps = {
  setSearchKeyword: Dispatch<SetStateAction<string>>;
};

export default function BookSearchForm({ setSearchKeyword }: BookSearchFormProps) {
  const keyword = "keyword" as const;
  const formState = FormState();

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    setSearchKeyword(formState.keyword);
  };

  return (
    <Form className={styles.form} onSubmit={handleSubmit}>
      <Form.InputWrapper htmlFor={keyword}>
        <Form.Input {...register(keyword)} placeholder="책 제목을 입력해주세요" />
      </Form.InputWrapper>

      <Clickable className={styles.button}>검색</Clickable>
    </Form>
  );
}
