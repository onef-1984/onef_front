import { playDragon } from "sicilian";

export const { initValue, handleValidate, ErrorState, FormState, register, setForm, handleSubmit } = playDragon({
  keyword: "",
});
