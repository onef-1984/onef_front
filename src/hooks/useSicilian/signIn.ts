import { playDragon } from "sicilian";

const signInFormController = playDragon({
  email: "",
  password: "",
});

const { handleValidate } = signInFormController;

export const validator = handleValidate({
  email: { required: true },
  password: { required: true },
});

export const { register, handleSubmit, ErrorState } = signInFormController;
