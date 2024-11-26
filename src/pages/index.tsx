import Head from "next/head";
import HeroSec from "@/components/heroSec/HeroSec";

export default function Home() {
  return (
    <>
      <Head>
        <title>onef - 메인 페이지</title>
      </Head>

      <HeroSec />
    </>
  );
}
