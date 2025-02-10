import { CreateForm } from "sicilian";

export const { handleSubmit, register } = new CreateForm({
  initValue: { keyword: "" },
  validator: {
    keyword: { required: true },
  },
  validateOn: ["submit"],
  clearFormOn: ["routeChange"],
});
