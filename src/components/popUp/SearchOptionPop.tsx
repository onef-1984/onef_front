import { useRouterAdv } from "@/hooks/useRouterAdv";

export default function SearchOptionPop() {
  const { query, push, location } = useRouterAdv();

  const handleClick = (orderBy: string) => () => {
    push({ pathname: location, query: { ...query, orderBy } }, location);
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
