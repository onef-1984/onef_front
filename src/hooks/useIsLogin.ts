import { useWhoAmIAdaptor } from "./useAdaptor/useWhoAmIAdaptor";

export const useIsLogin = () => {
  const { user } = useWhoAmIAdaptor();

  return user?.email ? true : false;
};
