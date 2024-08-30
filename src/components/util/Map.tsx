import { ReactNode } from "react";

export function Map<T>({ each, children }: { each: T[]; children: (item: T, index: number) => ReactNode }) {
  if (!each) return <></>;
  return <>{each.map(children)}</>;
}
