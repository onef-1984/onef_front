import { UserQuery } from "@/apis/Domains/User/User.query";
import { useQuery } from "@tanstack/react-query";

export const useWhoAmIAdaptor = () => {
  const userQuery = new UserQuery();
  const { data, isError, isPending } = useQuery(userQuery.getMe());

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
