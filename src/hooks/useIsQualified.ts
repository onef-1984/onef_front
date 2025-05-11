import { useUserQuery } from "@/apis/useDomain/useUser.query";
import { useRouterAdv } from "./useRouterAdv";
import { useReportQuery } from "@/apis/useDomain/useReport.query";

export const useIsQualified = (to: "login" | "myReport") => {
  const { data: me = { user: { id: "" } } } = useUserQuery().GetMe();
  const { id: reportId } = useRouterAdv();
  const {
    data: { user: reviewer },
  } = useReportQuery().GetReport(reportId);

  switch (to) {
    case "login":
      return me.user.id ? true : false;

    case "myReport":
      return me.user.id === reviewer.id;
  }
};
