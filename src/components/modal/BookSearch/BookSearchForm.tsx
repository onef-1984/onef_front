import Button from "@/components/clickable/Button";
import InputWrapper from "@/components/forms/InputWrapper";
import { ErrorState, FormState, register } from "@/hooks/useSicilian/bookSearch";
import styles from "./BookSearchModal.module.css";
import Input from "@/components/forms/Input";
import { Dispatch, SetStateAction } from "react";

type BookSearchFormProps = {
  setSearchKeyword: Dispatch<SetStateAction<string>>;
};

export default function BookSearchForm({ setSearchKeyword }: BookSearchFormProps) {
  const keyword = "keyword" as const;

  const formState = FormState();

  return (
    <form
      className={styles.form}
      onSubmit={(e) => {
        e.preventDefault();
        setSearchKeyword(formState.keyword);
      }}
    >
      <InputWrapper
        type="text"
        htmlFor={keyword}
        input={(type) => Input({ ...register(keyword), type, placeholder: "책 제목을 입력해주세요" })}
      ></InputWrapper>

      <Button className={styles.button}>검색</Button>
    </form>
  );
}
