import { playDragon } from "sicilian";

export const { initValue, register, setValue, FormState, handleSubmit } = playDragon({
  email: "",
  nickname: "",
  bio: "",
});
