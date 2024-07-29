import LayoutWrapper from "@/components/layoutWrapper/LayoutWrapper";
import Editor from "@/components/editor/Editor";

import { useState } from "react";
import Button from "@/components/clickable/Button";
import { useReportMutation } from "@/hooks/useMutation/useReportMutation";

export default function Edit() {
  const [content, setContent] = useState("");

  const { data, mutate } = useReportMutation();

  return (
    <LayoutWrapper>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          mutate({ data, report: { content, title: "테스트 타이틀" } });
        }}
        style={{ padding: "16px" }}
      >
        <Editor value={content} setValue={setContent} />

        <Button>저장</Button>
      </form>
    </LayoutWrapper>
  );
}
