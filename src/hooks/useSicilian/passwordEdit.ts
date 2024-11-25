import { passwordEditValidate } from "@/constants/edit/passwordEditValidate";
import { playDragon } from "sicilian";

export const { register, ErrorState, handleSubmit } = playDragon({
  initValue: {
    oldPassword: "",
    newPassword: "",
    newPasswordConfirm: "",
  },
  validator: passwordEditValidate(),
  validateOn: ["submit"],
  clearFormOn: ["routeChange", "submit"],
});
