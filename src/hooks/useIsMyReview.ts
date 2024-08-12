import { useReportAdaptor } from "./useAdaptor/report/useReportAdaptor";
import { useWhoAmIAdaptor } from "./useAdaptor/user/useWhoAmIAdaptor";

export const useIsMyReview = () => {
  const { user: me } = useWhoAmIAdaptor();
  const { user: reviewer } = useReportAdaptor();

  return me.id === reviewer.id;
};
