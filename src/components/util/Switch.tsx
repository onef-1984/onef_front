import { ReactNode } from "react";

export default function Switch<T extends { [x: string]: ReactNode }>({
  when,
  children,
}: {
  when: keyof T | "";
  children: T;
}) {
  return children[when];
}
