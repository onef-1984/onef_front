import { Dispatch, KeyboardEvent, ReactNode, SetStateAction } from "react";
import Tag from "../tag/Tag";
import { Show } from "../util/Show";
import { Map } from "../util/Map";

type TagInputWrapperProps = {
  tagList: Array<string>;
  setTagList: Dispatch<SetStateAction<Array<string>>>;
  value: string;
  setValue: any;
  input: ({
    handleKeyDown,
    handleKeyUp,
  }: {
    handleKeyDown: (e: KeyboardEvent) => void;
    handleKeyUp: (e: KeyboardEvent) => void;
  }) => ReactNode;
};

export default function TagInputWrapper({ tagList, setTagList, value, setValue, input }: TagInputWrapperProps) {
  const handleKeyUp = (event: KeyboardEvent) => {
    const trimmedValue = value.trim(); // 문자열의 앞뒤 공백만 제거
    const replacedValue = value.replace(/\s/g, ""); // 문자열 사이사이의 공백 제거

    // 공백 문자열을 태그로 입력하는 것 방지
    if (event.key === "Enter" && replacedValue !== "") {
      event.preventDefault();
      const isAlreadyInList = tagList.find((tag) => tag === trimmedValue); // 중복된 태그 입력 방지

      if (!isAlreadyInList) {
        setTagList((prevList) => {
          return [...prevList, trimmedValue];
        });
      }

      setValue({ ["tags"]: "" });
    }

    if (event.key === "Backspace" && value === "") {
      event.preventDefault();

      setTagList((prevList) => {
        const updatedList = [...prevList]; // 이전 배열을 복제합니다.
        updatedList.pop(); // 첫 번째 요소를 제거합니다.
        return updatedList;
      });
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  return (
    <div>
      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", alignItems: "center" }}>
          <Map each={tagList}>{(tag, index) => <Tag key={index}>{tag}</Tag>}</Map>
        </div>

        {input({ handleKeyUp, handleKeyDown })}
      </div>

      <Show when={tagList.length > 10}>태그는 최대 10개까지 입력 가능합니다.</Show>
    </div>
  );
}
