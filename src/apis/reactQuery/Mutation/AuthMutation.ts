import { Response } from "@/types/util.types";
import { MutationFn } from "./MutationFn";

export class AuthMutation extends MutationFn {
  constructor() {
    super();
  }

  postSign(url: string) {
    return (data: any) => this.mutationFn<Response>(url, "post", data);
  }

  deleteSignOut() {
    return () => this.mutationFn<Response>("/auth/signout", "delete");
  }

  patchProfile() {
    return (data: { profileImage?: string; nickname: string; bio?: string }) =>
      this.mutationFn<Response>("/user/profile", "patch", data);
  }
}
