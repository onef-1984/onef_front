import { SignValidate } from "@/constants/sign/signValidate";
import { playDragon } from "sicilian";

export const { register, setForm, FormState, ErrorState, handleSubmit } = playDragon({
  initValue: { email: "", nickname: "", bio: "" },
  validator: {
    nickname: SignValidate().nickname,
    bio: { maxLength: { number: 300, message: "소개글은 최대 300자까지 입력 가능합니다" } },
  },
  validateOn: ["submit"],
  clearFormOn: [],
});
