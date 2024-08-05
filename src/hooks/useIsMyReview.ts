import { useReportAdaptor } from "./useAdaptor/useReportAdaptor";
import { useWhoAmIAdaptor } from "./useAdaptor/useWhoAmIAdaptor";

export const useIsMyReview = () => {
  const { user: me } = useWhoAmIAdaptor();
  const { user: reviewer } = useReportAdaptor();

  return me.id === reviewer.id;
};
