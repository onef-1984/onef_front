import LayoutWrapper from "@/components/layoutWrapper/LayoutWrapper";
import { NextPage } from "next";
import { AppProps } from "next/app";
import { ReactNode } from "react";

type LayoutProps = {
  useDefaultLayout?: boolean;
  layout?: ({ children }: { children: ReactNode }) => ReactNode;
};

export type AppPropsWithLayout = AppProps & {
  Component: NextPage & LayoutProps;
};

export const getLayout = ({ useDefaultLayout = true, layout }: LayoutProps) => {
  if (useDefaultLayout) return LayoutWrapper;
  else return layout ?? (({ children }) => <>{children}</>);
};
