import { SignValidate } from "@/constants/sign/signValidate";
import { playDragon } from "sicilian";
import pick from "@/utils/pick";

const initValue = { email: "", password: "" };

const { handleValidate, ErrorState, FormState, register, handleSubmit, setValue } = playDragon(initValue);

const validator = handleValidate({
  ...pick(SignValidate(), ["email", "password"]),
});

export { initValue, validator, ErrorState, FormState, register, handleSubmit, setValue };
