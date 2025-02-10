import { passwordEditValidate } from "@/constants/edit/passwordEditValidate";
import { CreateForm } from "sicilian";

export const { register, getErrors, handleSubmit } = new CreateForm({
  initValue: {
    oldPassword: "",
    newPassword: "",
    newPasswordConfirm: "",
  },
  validator: passwordEditValidate(),
  validateOn: ["submit"],
  clearFormOn: ["routeChange", "submit"],
});
