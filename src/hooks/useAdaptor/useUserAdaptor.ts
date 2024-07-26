import { UserQuery } from "@/apis/reactQuery/Query/UserQuery";
import { useQuery } from "@tanstack/react-query";

export const useUserAdaptor = () => {
  const reportQuery = new UserQuery();
  const { data, isError, isPending } = useQuery(reportQuery.getMe());

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
