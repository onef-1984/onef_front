import LayoutWrapper from "@/components/layoutWrapper/LayoutWrapper";
import EditForm from "@/components/reportEdit/EditForm";
import EditHeader from "@/components/reportEdit/EditHeader";
import { useReportAdaptor } from "@/hooks/useAdaptor/useReportAdaptor";
import { useReportTagList } from "@/hooks/useCaroKann/useReportTagList";
import { MutationContext } from "@/hooks/useContext/useMutationContext";
import { usePutReportMutation } from "@/hooks/useMutation/report/usePutReportMutation";
import { setValue } from "@/hooks/useSicilian/report";
import { useEffect } from "react";

export default function Edit() {
  // TODO : 레포트 수정 작업에 필요한 로직을 컴포넌트 외부로 분리해야 합니다
  const { mutate } = usePutReportMutation();
  const [tagList, setTagList] = useReportTagList();

  const {
    report: { title, content, tags },
    isPending,
  } = useReportAdaptor();

  useEffect(() => {
    setValue({
      title,
      content,
    });
    setTagList(tags);
  }, [isPending]);

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
