import { ReactNode } from "react";

export default function Map<T>({
  each,
  children,
  fallback = "",
}: {
  each: T[];
  fallback?: ReactNode;
  children: (item: T, index: number) => ReactNode;
}) {
  return <>{each?.length !== 0 ? each.map(children) : fallback}</>;
}
