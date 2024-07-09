import { MutationFn } from "./MutationFn";

export class AuthMutation extends MutationFn {
  constructor() {
    super();
  }

  postSign(url: string) {
    return (data: { email: string; password: string; nickname?: string }) =>
      this.mutationFn<{ message: string }>(url, "post", data);
  }
}
