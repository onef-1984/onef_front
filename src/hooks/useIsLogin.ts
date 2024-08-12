import { useWhoAmIAdaptor } from "./useAdaptor/user/useWhoAmIAdaptor";

export const useIsLogin = () => {
  const { user } = useWhoAmIAdaptor();

  return user?.email ? true : false;
};
