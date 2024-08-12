import { UserQuery } from "@/apis/reactQuery/Query/UserQuery";
import { useQuery } from "@tanstack/react-query";

export const useUserAdaptor = (userNickname: string) => {
  const userQuery = new UserQuery();
  const { data, isError, isPending } = useQuery(userQuery.getUser(userNickname));

  return {
    isPending,
    isError,
    user: {
      id: data?.id ?? "",
      email: data?.email ?? "",
      nickname: data?.nickname ?? "",
      profileImage: data?.profileImage ?? "",
      role: data?.role ?? "USER",
      bio: data?.bio ?? "",
    },
  };
};
