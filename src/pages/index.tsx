import LayoutWrapper from "@/components/layoutWrapper/LayoutWrapper";
import Head from "next/head";
import HomeCarousel from "@/components/homeCarousel/HomeCarousel";
import EyeCatch from "@/components/eyeCatch/EyeCatch";
import EditorsPick from "@/components/editorsPick/EditorsPick";
import styles from "@/styles/Index.module.css";

export default function Home() {
  return (
    <>
      <Head>
        <title>onef - 메인 페이지</title>
      </Head>

      <LayoutWrapper>
        <div className={styles.root}>
          <EyeCatch />
          <EditorsPick />
          <HomeCarousel />
        </div>
      </LayoutWrapper>
    </>
  );
}
