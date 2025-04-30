import { GetEditorsPickQuery } from "@/types/graphql.types";

export class EPQueryAdaptor {
  static getEditorsPick = (data: GetEditorsPickQuery) => ({
    editorsPick: {
      description: data.getEditorsPick.description,
      reportId: data.getEditorsPick.report.id,
      title: data.getEditorsPick.report.title,
      cover: data.getEditorsPick.report.book.cover,
      nickname: data.getEditorsPick.report.user.nickname,
    },
  });
}
