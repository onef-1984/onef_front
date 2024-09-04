import InputWrapper from "@/components/forms/InputWrapper";
import { FormState, register } from "@/hooks/useSicilian/bookSearch";
import styles from "./BookSearchModal.module.css";
import Input from "@/components/forms/Input";
import { Dispatch, SetStateAction } from "react";
import Form from "@/components/forms/Form";
import Clickable from "@/components/clickable/Clickable";

type BookSearchFormProps = {
  setSearchKeyword: Dispatch<SetStateAction<string>>;
};

export default function BookSearchForm({ setSearchKeyword }: BookSearchFormProps) {
  const keyword = "keyword" as const;

  const formState = FormState();

  return (
    <Form
      className={styles.form}
      onSubmit={(e) => {
        e.preventDefault();
        setSearchKeyword(formState.keyword);
      }}
      inputWrapper={
        <InputWrapper htmlFor={keyword}>
          <Input {...register(keyword)} placeholder="책 제목을 입력해주세요" />
        </InputWrapper>
      }
      button={<Clickable className={styles.button}>검색</Clickable>}
    />
  );
}
