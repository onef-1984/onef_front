import { UtilFnOmit } from "@/types/client.types";

const omit: UtilFnOmit = (obj, keys) => {
  for (const key of keys) {
    delete obj[key];
  }

  return obj;
};

export default omit;
