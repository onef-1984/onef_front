import { handleSubmit, setValue, register } from "@/hooks/useSicilian/reportSearch";
import Input from "@/components/forms/Input";
import Button from "@/components/clickable/Button";
import styles from "./Search.module.css";
import InputWrapper from "../forms/InputWrapper";
import { useRouterAdv } from "@/hooks/useRouterAdv";
import Form from "../forms/Form";
import { useEffect } from "react";

export default function SearchBar() {
  const { keyword, push, query } = useRouterAdv();

  useEffect(() => {
    setValue({ keyword });
  }, [keyword]);

  return (
    <Form
      className={styles.searchBar}
      onSubmit={handleSubmit((data) => {
        push({ pathname: "/search", query: { ...query, keyword: data.keyword } }, "/search");
      })}
      inputWrapper={
        <InputWrapper htmlFor="keyword">
          <Input {...register("keyword")} placeholder="검색어를 입력해주세요" />
        </InputWrapper>
      }
      button={<Button>검색</Button>}
    ></Form>
  );
}
