import { ReactNode } from "react";

export default function Show({
  when,
  children,
  fallback = "",
}: {
  when: boolean;
  children: ReactNode;
  fallback?: ReactNode;
}) {
  return <>{when ? children : fallback}</>;
}
