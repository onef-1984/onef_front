import { createContext } from "react";

export const MutationContext = createContext((reqData: { title: string; content: string; tags: Array<string> }) => {});
