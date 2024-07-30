import { playDragon } from "sicilian";

export const { initValue, register, setValue, FormState, handleSubmit } = playDragon({
  title: "",
  content: "",
  tags: "",
});
