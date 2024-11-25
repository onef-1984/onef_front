import { playDragon } from "sicilian";

export const { handleSubmit, register } = playDragon({
  initValue: { keyword: "" },
  validator: {
    keyword: { required: true },
  },
  validateOn: ["submit"],
  clearFormOn: ["routeChange"],
});
