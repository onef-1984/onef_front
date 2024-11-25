import { UserRequest } from "@/apis/request/UserRequest";
import { useQuery } from "@tanstack/react-query";

export const useUserAdaptor = (userNickname: string) => {
  const userRequest = new UserRequest();
  const { data, isError, isPending } = useQuery(userRequest.getUser(userNickname));

  return {
    isPending,
    isError,
    user: {
      id: data?.user.id ?? "",
      email: data?.user.email ?? "",
      nickname: data?.user.nickname ?? "",
      profileImage: data?.user.profileImage ?? "",
      role: data?.user.role ?? "USER",
      bio: data?.user.bio ?? "",
    },
  };
};
