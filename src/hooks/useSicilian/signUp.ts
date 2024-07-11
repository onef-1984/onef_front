import { playDragon } from "sicilian";

const signUpFormController = playDragon({
  email: "",
  password: "",
  passwordCheck: "",
  nickname: "",
});
export const { register, handleSubmit } = signUpFormController;
