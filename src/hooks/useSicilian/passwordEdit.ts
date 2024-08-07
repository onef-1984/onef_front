import { playDragon } from "sicilian";

export const { initValue, register, setValue, FormState, ErrorState, handleSubmit, handleValidate } = playDragon({
  oldPassword: "",
  newPassword: "",
  newPasswordConfirm: "",
});
