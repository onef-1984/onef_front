import { ErrorResponse } from "@/types/server.types";
import { MutationFn } from "./MutationFn";
import { SignData } from "@/types/client.types";

export class AuthMutation extends MutationFn {
  constructor() {
    super();
  }

  postSign(url: string) {
    return (data: SignData) => this.mutationFn<ErrorResponse>(url, "post", data);
  }
}
