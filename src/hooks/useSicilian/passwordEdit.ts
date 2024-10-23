import { playDragon } from "sicilian";

export const { initValue, register, setForm, FormState, ErrorState, handleSubmit, handleValidate } = playDragon({
  oldPassword: "",
  newPassword: "",
  newPasswordConfirm: "",
});
