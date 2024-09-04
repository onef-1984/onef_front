import { handleSubmit, setValue, register } from "@/hooks/useSicilian/reportSearch";
import Input from "@/components/forms/Input";
import styles from "./Search.module.css";
import InputWrapper from "../forms/InputWrapper";
import { useRouterAdv } from "@/hooks/useRouterAdv";
import Form from "../forms/Form";
import { useEffect } from "react";
import Clickable from "../clickable/Clickable";

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
      button={<Clickable>검색</Clickable>}
    ></Form>
  );
}
