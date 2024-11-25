import { createContext } from "react";

type MutationFn = (props: { title: string; isbn13: string; content: string; tags: string[] }) => void;

export const MutationContext = createContext<MutationFn>(() => {});
