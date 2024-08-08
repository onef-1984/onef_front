import LayoutWrapper from "@/components/layoutWrapper/LayoutWrapper";
import { useRouterAdv } from "@/hooks/useRouterAdv";
import Head from "next/head";
import { useEffect } from "react";

export default function Home() {
  const { push } = useRouterAdv();

  useEffect(() => {
    push("/search");
  });

  return (
    <>
      <Head>
        <title>onef - 메인 페이지</title>
      </Head>

      <LayoutWrapper>
        <></>
      </LayoutWrapper>
    </>
  );
}
