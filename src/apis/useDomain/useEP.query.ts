import { useQuery } from "@tanstack/react-query";
import { EPQuery } from "../Domains/EditorsPick/EP.query";
import { EPQueryAdaptor } from "../Adaptor/EP.adaptor";

export const useEPQuery = () => {
  const GetEditorsPick = () => {
    const { data, ...res } = useQuery(new EPQuery().getEditorsPick());
    return { ...res, data: EPQueryAdaptor.getEditorsPick(data) };
  };
  return {
    GetEditorsPick,
  };
};
