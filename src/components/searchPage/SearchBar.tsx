import { handleSubmit, register } from "@/hooks/useSicilian/reportSearch";
import { useRouterAdv } from "@/hooks/useRouterAdv";
import Clickable from "../clickable/Clickable";
import styles from "./Search.module.css";
import Form from "../forms/Form";

export default function SearchBar() {
  const { push, query } = useRouterAdv();

  return (
    <Form
      className={styles.searchBar}
      onSubmit={handleSubmit((data) => {
        push({ pathname: "/search", query: { ...query, keyword: data.keyword } }, "/search");
      })}
    >
      <Form.InputWrapper htmlFor="keyword">
        <Form.Input {...register("keyword")} placeholder="검색어를 입력해주세요" />
      </Form.InputWrapper>

      <Clickable>검색</Clickable>
    </Form>
  );
}
