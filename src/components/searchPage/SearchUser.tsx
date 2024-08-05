import { useUserAdaptor } from "@/hooks/useAdaptor/useUserAdaptor";
import { useRouterAdv } from "@/hooks/useRouterAdv";
import styles from "./Search.module.css";

export default function SearchUser() {
  const { keyword: userId } = useRouterAdv();

  const {
    user: { nickname },
  } = useUserAdaptor(userId);

  return (
    <>
      <div className={styles.searchUser}>
        <span>{nickname}</span> 님이 작성한 리뷰
        <hr />
      </div>
    </>
  );
}
