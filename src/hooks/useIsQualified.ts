import { useReportAdaptor } from "./useAdaptor/report/useReportAdaptor";
import { useWhoAmIAdaptor } from "./useAdaptor/user/useWhoAmIAdaptor";

export const useIsQualified = (to: "login" | "myReport") => {
  const { user: me } = useWhoAmIAdaptor();
  const { user: reviewer } = useReportAdaptor();

  switch (to) {
    case "login":
      return me?.email ? true : false;

    case "myReport":
      return me.id === reviewer.id;
  }
};
