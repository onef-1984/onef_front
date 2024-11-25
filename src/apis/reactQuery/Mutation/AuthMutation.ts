import { Message } from "@/types/graphql.types";
import { MutationFn } from "./MutationFn";

export class AuthMutation extends MutationFn {
  constructor() {
    super();
  }

  postSign(url: string) {
    return (data: any) => this.mutationFn<Message>(url, "post", data);
  }

  deleteSignOut() {
    return () => this.mutationFn<Message>("/auth/signout", "delete");
  }
}
