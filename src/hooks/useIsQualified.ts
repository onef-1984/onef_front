import { useUserQuery } from "@/apis/useDomain/useUser.query";
import { useRouterAdv } from "./useRouterAdv";
import { useReportQuery } from "@/apis/useDomain/useReport.query";

export const useIsQualified = (to: "login" | "myReport") => {
  const { data: me = { user: { id: "" } } } = new useUserQuery().getMe();
  const { id: reportId } = useRouterAdv();
  const { data: { user: reviewer } = { user: { id: "" } } } = new useReportQuery().getReport(reportId);

  switch (to) {
    case "login":
      return me ? true : false;

    case "myReport":
      return me.user.id === reviewer.id;
  }
};
