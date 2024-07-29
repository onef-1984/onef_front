import { useReviewAdaptor } from "./useAdaptor/useReviewAdaptor";
import { useUserAdaptor } from "./useAdaptor/useUserAdaptor";

export const useIsMyReview = () => {
  const { user: me } = useUserAdaptor();
  const { user: reviewer } = useReviewAdaptor();

  return me.id === reviewer.id;
};
