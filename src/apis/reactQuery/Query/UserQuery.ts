import { QueryFn } from "./QueryFn";
import { User } from "@/types/auth.types";

export class UserQuery extends QueryFn {
  constructor() {
    super();
  }

  queryKey = ["user"];

  getMe() {
    return {
      queryKey: [...this.queryKey],
      queryFn: this.queryFn<User>("user/me"),
    };
  }

  getUser(userNickname: string) {
    return {
      queryKey: [...this.queryKey, userNickname],
      queryFn: this.queryFn<User>(`user/${userNickname}`),
    };
  }
}
