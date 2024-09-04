import Clickable from "@/components/clickable/Clickable";
import LayoutWrapper from "@/components/layoutWrapper/LayoutWrapper";
import { useRouterAdv } from "@/hooks/useRouterAdv";
import styles from "@/styles/404.module.css";
import Head from "next/head";

export default function Home() {
  const { push } = useRouterAdv();

  return (
    <>
      <Head>
        <title>onef - Page Not Found</title>
      </Head>

      <LayoutWrapper>
        <div className={styles.root}>
          Page Not Found
          <Clickable
            className={styles.button}
            type="button"
            onClick={() => {
              push("/");
            }}
          >
            go to main page
          </Clickable>
        </div>
      </LayoutWrapper>
    </>
  );
}
