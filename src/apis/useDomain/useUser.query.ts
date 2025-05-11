/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from "@tanstack/react-query";
import { UserQuery } from "../Domains/User/User.query";
import { UserQueryAdaptor } from "../Adaptor/User.adaptor";

export const useUserQuery = () => {
  const GetUser = (userNickname: string) => {
    const { data, ...res } = useQuery(new UserQuery().getUser(userNickname));
    return { ...res, data: UserQueryAdaptor.getUser(data) };
  };

  const GetMe = () => {
    const { data, ...res } = useQuery(new UserQuery().getMe());
    return { ...res, data: UserQueryAdaptor.getMe(data) };
  };

  return { GetUser, GetMe };
};
