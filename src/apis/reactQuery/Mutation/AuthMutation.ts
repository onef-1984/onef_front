import { Response } from "@/types/util.types";
import { MutationFn } from "./MutationFn";
import { SignData } from "@/types/auth.types";

export class AuthMutation extends MutationFn {
  constructor() {
    super();
  }

  postSign(url: string) {
    return (data: SignData) => this.mutationFn<Response>(url, "post", data);
  }
}
