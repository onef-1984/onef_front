import { UserRequest } from "@/apis/request/UserRequest";
import { useQuery } from "@tanstack/react-query";

export const useWhoAmIAdaptor = () => {
  const userRequest = new UserRequest();
  const { data, isError, isPending } = useQuery(userRequest.getMe());

  return {
    isPending,
    isError,
    user: {
      id: data?.user.id ?? "",
      email: data?.user.email ?? "",
      nickname: data?.user.nickname ?? "",
      profileImage: data?.user.profileImage ?? "",
      bio: data?.user.bio ?? "",
    },
  };
};
