import { SignValidate } from "@/constants/sign/signValidate";
import { CreateForm } from "sicilian";

export const { register, setValues, getValues, getErrors, handleSubmit } = new CreateForm({
  initValue: { email: "", nickname: "", bio: "" },
  validator: {
    nickname: SignValidate().nickname,
    bio: { maxLength: { number: 300, message: "소개글은 최대 300자까지 입력 가능합니다" } },
  },
  validateOn: ["submit"],
});
