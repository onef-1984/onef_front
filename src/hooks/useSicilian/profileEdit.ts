import { playDragon } from "sicilian";

export const { initValue, register, setForm, FormState, ErrorState, handleSubmit } = playDragon({
  email: "",
  nickname: "",
  bio: "",
});
