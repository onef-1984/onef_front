import { UserQuery } from "@/apis/reactQuery/Query/UserQuery";
import { useQuery } from "@tanstack/react-query";

export const useWhoAmIAdaptor = () => {
  const userQuery = new UserQuery();
  const { data, isError, isPending } = useQuery(userQuery.getMe());

  return {
    isPending,
    isError,
    user: {
      id: data?.id ?? "",
      email: data?.email ?? "",
      nickname: data?.nickname ?? "",
      profileImage: data?.profileImage ?? "",
    },
  };
};
