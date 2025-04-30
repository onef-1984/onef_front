import { useQuery } from "@tanstack/react-query";
import { UserQuery } from "../Domains/User/User.query";
import { withAdaptor } from "../Decorator/withQuery";
import { UserQueryAdaptor } from "../Adaptor/User.adaptor";

export class useUserQuery {
  private userQuery = new UserQuery();

  @withAdaptor(UserQueryAdaptor.getUser)
  getUser = (userNickname: string) => useQuery(this.userQuery.getUser(userNickname));

  @withAdaptor(UserQueryAdaptor.getMe)
  getMe = () => useQuery(this.userQuery.getMe());
}
