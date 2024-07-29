import { useUserAdaptor } from "./useAdaptor/useUserAdaptor";

export const useIsLogin = () => {
  const { user } = useUserAdaptor();

  return user?.email ? true : false;
};
