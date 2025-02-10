import { CreateForm } from "sicilian";

export const { register, handleSubmit } = new CreateForm({
  initValue: { keyword: "" },
});
