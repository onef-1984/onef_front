import { UserQuery } from "@/apis/Domains/User/User.query";
import { useQuery } from "@tanstack/react-query";

export const useUserAdaptor = (userNickname: string) => {
  const userQuery = new UserQuery();
  const { data, isError, isPending } = useQuery(userQuery.getUser(userNickname));

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
