import { useUserQuery } from "@/apis/useDomain/useUser.query";

export const Guard = {
  login: function GuardLogin({ children }: { children: React.ReactNode }) {
    const { data } = useUserQuery().GetMe();

    if (!data) return null;
    return <>{children}</>;
  },
  reportOwner: function GuardReportOwner() {},
};
