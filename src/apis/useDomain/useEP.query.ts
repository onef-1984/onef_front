/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from "@tanstack/react-query";
import { EPQuery } from "../Domains/EditorsPick/EP.query";
import { EPQueryAdaptor } from "../Adaptor/EP.adaptor";
import { thisBind } from "../Decorator/thisBind";
import { transformResult } from "../Decorator/transformResult";

@thisBind
export class useEPQuery {
  private epQuery = new EPQuery();

  @transformResult(EPQueryAdaptor.getEditorsPick)
  getEditorsPick() {
    return useQuery(this.epQuery.getEditorsPick());
  }
}
