import { Response } from "@/types/util.types";
import { MutationFn } from "./MutationFn";

export class AuthMutation extends MutationFn {
  constructor() {
    super();
  }

  postSign(url: string) {
    return (data: any) => this.mutationFn<Response>(url, "post", data);
  }
}
