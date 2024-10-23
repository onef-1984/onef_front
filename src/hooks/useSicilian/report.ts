import { playDragon } from "sicilian";

export const { initValue, register, setForm, FormState, handleSubmit, handleValidate } = playDragon({
  title: "",
  content: "",
  tags: "",
});
