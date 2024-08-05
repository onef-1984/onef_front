import { useUserAdaptor } from "@/hooks/useAdaptor/useUserAdaptor";
import { useRouterAdv } from "@/hooks/useRouterAdv";

export default function SearchUser() {
  const { keyword: userId } = useRouterAdv();

  const {
    user: { nickname },
  } = useUserAdaptor(userId);

  return <div>{nickname} 님이 작성한 리뷰</div>;
}
