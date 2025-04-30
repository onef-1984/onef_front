import { useQuery } from "@tanstack/react-query";
import { EPQuery } from "../Domains/EditorsPick/EP.query";
import { withAdaptor } from "../Decorator/withQuery";
import { EPQueryAdaptor } from "../Adaptor/EP.adaptor";

export class useEPQuery {
  private epQuery = new EPQuery();

  @withAdaptor(EPQueryAdaptor.getEditorsPick)
  getEditorsPick = () => useQuery(this.epQuery.getEditorsPick());
}
