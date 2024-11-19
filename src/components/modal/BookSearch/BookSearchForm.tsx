import { register, handleSubmit } from "@/hooks/useSicilian/bookSearch";
import styles from "./BookSearchModal.module.css";
import { Dispatch, SetStateAction } from "react";
import Form from "@/components/forms/Form";
import Clickable from "@/components/clickable/Clickable";

type BookSearchFormProps = {
  setSearchKeyword: Dispatch<SetStateAction<string>>;
};

export default function BookSearchForm({ setSearchKeyword }: BookSearchFormProps) {
  const keyword = "keyword" as const;

  return (
    <Form className={styles.form} onSubmit={handleSubmit(({ keyword }) => setSearchKeyword(keyword))}>
      <Form.InputWrapper htmlFor={keyword}>
        <Form.Input {...register(keyword)} placeholder="책 제목을 입력해주세요" />
      </Form.InputWrapper>

      <Clickable className={styles.button}>검색</Clickable>
    </Form>
  );
}
