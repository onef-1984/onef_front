import { QueryFn } from "./QueryFn";
import { GetEditorsPick } from "@/types/editorsPick";

export class EditorsPickQuery extends QueryFn {
  constructor() {
    super();
  }

  queryKey = ["editorsPick"];

  getEditorsPick() {
    return {
      queryKey: [...this.queryKey],
      queryFn: this.queryFn<GetEditorsPick>(`/editors-pick`),
    };
  }
}
