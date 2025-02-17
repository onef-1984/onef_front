import { EPQuery } from "@/apis/Domains/EditorsPick/EP.query";
import { useQuery } from "@tanstack/react-query";

export const useEditorsPickAdaptor = () => {
  const epQuery = new EPQuery();
  const { data, isPending } = useQuery(epQuery.getEditorsPick());

  return {
    isPending,
    editorsPick: {
      description: data?.getEditorsPick.description ?? "",
      reportId: data?.getEditorsPick.report?.id ?? "",
      title: data?.getEditorsPick.report?.title ?? "",
      cover: data?.getEditorsPick.report?.book.cover ?? "",
      nickname: data?.getEditorsPick.report?.user.nickname ?? "",
    },
  };
};
