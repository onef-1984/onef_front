/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from "@tanstack/react-query";
import { UserQuery } from "../Domains/User/User.query";
import { transformResult } from "../Decorator/transformResult";
import { UserQueryAdaptor } from "../Adaptor/User.adaptor";
import { thisBind } from "../Decorator/thisBind";

@thisBind
export class useUserQuery {
  private userQuery = new UserQuery();

  @transformResult(UserQueryAdaptor.getUser)
  getUser(userNickname: string) {
    return useQuery(this.userQuery.getUser(userNickname));
  }

  @transformResult(UserQueryAdaptor.getMe)
  getMe() {
    return useQuery(this.userQuery.getMe());
  }
}
