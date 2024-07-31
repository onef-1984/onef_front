import { useReportAdaptor } from "./useAdaptor/useReportAdaptor";
import { useUserAdaptor } from "./useAdaptor/useUserAdaptor";

export const useIsMyReview = () => {
  const { user: me } = useUserAdaptor();
  const { user: reviewer } = useReportAdaptor();

  return me.id === reviewer.id;
};
