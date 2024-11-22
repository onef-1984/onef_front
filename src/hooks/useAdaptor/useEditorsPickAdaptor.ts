import { EditorsPickRequest } from "@/apis/request/EditorsPickRequest";
import { useQuery } from "@tanstack/react-query";

export const useEditorsPickAdaptor = () => {
  const editorsPickRequest = new EditorsPickRequest();
  const { data, isPending } = useQuery(editorsPickRequest.getEditorsPick());

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
