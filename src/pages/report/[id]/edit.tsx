import { useRouteId } from "@/hooks/useRouteId";

export default function Edit() {
  const id = useRouteId();

  return <>{id}</>;
}
