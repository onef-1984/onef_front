import LayoutWrapper from "@/components/layoutWrapper/LayoutWrapper";
import EditForm from "@/components/reportEdit/EditForm";
import EditHeader from "@/components/reportEdit/EditHeader";
import { MutationContext } from "@/hooks/useContext/useMutationContext";
import { usePostReportMutation } from "@/hooks/useMutation/report/usePostReportMutation";

export default function Create() {
  const { mutate } = usePostReportMutation();

  return (
    <LayoutWrapper>
      <EditHeader />
      <MutationContext.Provider
        value={(reqData) => {
          mutate(reqData);
        }}
      >
        <EditForm />
      </MutationContext.Provider>
    </LayoutWrapper>
  );
}
