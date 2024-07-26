import { playDragon } from "sicilian";

export const { initValue, handleValidate, ErrorState, FormState, register, handleSubmit } = playDragon({
  email: "",
  password: "",
});
