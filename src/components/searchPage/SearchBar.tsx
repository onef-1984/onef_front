import { handleSubmit, setForm, register } from "@/hooks/useSicilian/reportSearch";
import styles from "./Search.module.css";
import { useRouterAdv } from "@/hooks/useRouterAdv";
import Form from "../forms/Form";
import { useEffect } from "react";
import Clickable from "../clickable/Clickable";

export default function SearchBar() {
  const { keyword, push, query } = useRouterAdv();

  const handleFormSubmit = () => {
    handleSubmit((data) => {
      push({ pathname: "/search", query: { ...query, keyword: data.keyword } }, "/search");
    });
  };

  useEffect(() => {
    setForm({ keyword });
  }, [keyword]);

  return (
    <Form className={styles.searchBar} onSubmit={handleFormSubmit}>
      <Form.InputWrapper htmlFor="keyword">
        <Form.Input {...register("keyword")} placeholder="검색어를 입력해주세요" />
      </Form.InputWrapper>

      <Clickable>검색</Clickable>
    </Form>
  );
}
