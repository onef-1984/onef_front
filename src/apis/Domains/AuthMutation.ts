import { Message } from "@/types/graphql.types";
import { Mutation } from "@/apis/Base/Mutation";

export class AuthMutation extends Mutation {
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
