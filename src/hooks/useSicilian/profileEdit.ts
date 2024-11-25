import { SignValidate } from "@/constants/sign/signValidate";
import { playDragon } from "sicilian";

export const { register, setForm, FormState, ErrorState, handleSubmit } = playDragon({
  initValue: { email: "", nickname: "", bio: "" },
  validator: {
    nickname: SignValidate().nickname,
    bio: { maxLength: { number: 150, message: "소개글은 150자를 넘길 수 없습니다" } },
  },
  validateOn: ["submit"],
  clearFormOn: [],
});
