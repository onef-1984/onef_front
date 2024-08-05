import { OrderBy, SearchType } from "@/types/util.types";
import { useRouter } from "next/router";

export const useRouterAdv = () => {
  const { push, back, query } = useRouter();

  const id = query.id as string;

  const keyword = typeof query.keyword === "string" ? query.keyword : "";
  const orderBy = typeof query.orderBy === "string" ? (query.orderBy as OrderBy) : "createdAt";
  const searchType = typeof query.searchType === "string" ? (query.searchType as SearchType) : "report";

  return { push, back, query, id, keyword, orderBy, searchType };
};
