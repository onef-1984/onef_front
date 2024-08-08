import LayoutWrapper from "@/components/layoutWrapper/LayoutWrapper";
import { useRouterAdv } from "@/hooks/useRouterAdv";
import Head from "next/head";

export default function Home() {
  const { push } = useRouterAdv();
  push("/search");

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
