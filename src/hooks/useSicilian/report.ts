import { playDragon } from "sicilian";

export const { ErrorState, register, FormState, setForm, handleSubmit } = playDragon({
  initValue: { title: "", content: "", tags: "" },
  validator: {
    title: {
      maxLength: { number: 19, message: "제목은 19자 이하로 입력해주세요" },
      minLength: { number: 4, message: "제목은 4자 이상 입력해주세요" },
    },
    content: {
      maxLength: { number: 1984, message: "내용은 1984자 이하로 입력해주세요" },
      minLength: { number: 84, message: "내용은 84자 이상 입력해주세요" },
    },
  },
  validateOn: ["submit", "blur"],
  clearFormOn: ["routeChange", "submit"],
});
