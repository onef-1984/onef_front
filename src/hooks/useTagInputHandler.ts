import { Dispatch, KeyboardEvent, SetStateAction } from "react";

export type UseTagInputHandler = {
  value: string;
  setValue: any;
  tagList: Array<string>;
  setTagList: Dispatch<SetStateAction<Array<string>>>;
};

export const useTagInputHandler = ({ value, tagList, setTagList, setValue }: UseTagInputHandler) => {
  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  const onKeyUp = (event: KeyboardEvent) => {
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

    // 태그 삭제 기능을 키보드 대신 버튼으로 구현
    // if (event.key === "Backspace" && value === "") {
    //   event.preventDefault();

    //   setTagList((prevList) => {
    //     const updatedList = [...prevList]; // 이전 배열을 복제합니다.
    //     updatedList.pop(); // 첫 번째 요소를 제거합니다.
    //     return updatedList;
    //   });
    // }
  };

  const onClick = (index: number) => {
    const newTagList = tagList.reduce((acc, cur, i) => {
      return i === index ? acc : [...acc, cur];
    }, [] as Array<string>);

    setTagList(newTagList);
  };

  return { onKeyDown, onKeyUp, onClick };
};
