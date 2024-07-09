import { useRouter } from "next/router";

export const useRouteId = () => {
  const router = useRouter();

  const { id } = router.query;

  return id;
};
