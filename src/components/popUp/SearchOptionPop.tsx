import { useRouterAdv } from "@/hooks/useRouterAdv";

export default function SearchOptionPop() {
  const { query, push } = useRouterAdv();

  const handleClick = (orderBy: string) => () => {
    push({ pathname: "/search", query: { ...query, orderBy } }, "/search");
  };

  return (
    <>
      <button type="button" onClick={handleClick("createdAt")}>
        최신순
      </button>

      <button type="button" onClick={handleClick("userLiked")}>
        인기순
      </button>
    </>
  );
}
