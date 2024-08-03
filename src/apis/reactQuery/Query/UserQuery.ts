import { QueryFn } from "./QueryFn";
import { UserEndPoint } from "@/apis/endpoints/user";
import { User } from "@/types/auth.types";

export class UserQuery extends QueryFn {
  constructor() {
    super();
  }

  queryKey = ["user"];

  getMe() {
    return {
      queryKey: [...this.queryKey],
      queryFn: this.queryFn<User>(UserEndPoint.getMe()),
    };
  }
}
