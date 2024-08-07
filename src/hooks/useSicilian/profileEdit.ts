import { playDragon } from "sicilian";

export const { initValue, register, setValue, FormState, ErrorState, handleSubmit } = playDragon({
  email: "",
  nickname: "",
  bio: "",
});
