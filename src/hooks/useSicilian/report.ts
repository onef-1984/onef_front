import { playDragon } from "sicilian";

export const { initValue, register, setValue, FormState, handleSubmit, handleValidate } = playDragon({
  title: "",
  content: "",
  tags: "",
});
