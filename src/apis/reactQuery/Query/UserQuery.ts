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

  getUser(userId: string) {
    return {
      queryKey: [...this.queryKey, userId],
      queryFn: this.queryFn<User>(`user/${userId}`),
    };
  }
}
