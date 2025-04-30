import { useUserQuery } from "@/apis/useDomain/useUser.query";

export const useIsQualified = (to: "login" | "myReport") => {
  const { data } = new useUserQuery().getMe();
  // const { id: reportId } = useRouterAdv();
  // const {
  //   data: { user: reviewer },
  // } = new useReportQuery().getReport(reportId);

  switch (to) {
    case "login":
      return data?.user ? true : false;

    case "myReport":
      // return me.id === reviewer.id;
      return true;
  }
};
