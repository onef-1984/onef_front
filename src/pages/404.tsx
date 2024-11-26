import Clickable from "@/components/clickable/Clickable";
import HeadMetaTag from "@/components/HeadMetaTag/HeadMetaTag";
import { useRouterAdv } from "@/hooks/useRouterAdv";
import styles from "@/styles/404.module.css";

export default function Home() {
  const { push } = useRouterAdv();

  return (
    <>
      <HeadMetaTag title="Page Not Found" description="요청한 페이지를 찾을 수 없습니다" />

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
    </>
  );
}
