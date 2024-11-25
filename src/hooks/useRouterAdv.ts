import { OrderBy, SearchType } from "@/types/graphql.types";
import { useRouter } from "next/router";

export const useRouterAdv = () => {
  const { push, back, query, asPath, isReady } = useRouter();

  const id = query.id as string;

  const keyword = typeof query.keyword === "string" ? query.keyword : "";
  const orderBy = typeof query.orderBy === "string" ? (query.orderBy as OrderBy) : OrderBy.CreatedAt;
  const searchType = typeof query.searchType === "string" ? (query.searchType as SearchType) : SearchType.Report;

  const location = asPath.split("?")[0];

  const pathWithoutHash = location.split("#")[0];

  return { push, back, isReady, pathWithoutHash, asPath, location, query, id, keyword, orderBy, searchType };
};
