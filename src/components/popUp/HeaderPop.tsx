import { useSignOutMutation } from "@/hooks/useMutation/useSignOutMutation";
import { useRouterAdv } from "@/hooks/useRouterAdv";
import Link from "next/link";

type HeaderPopProps = {
  onClick: () => void;
};

export default function HeaderPop({ onClick }: HeaderPopProps) {
  const { mutate } = useSignOutMutation();
  const { push, asPath } = useRouterAdv();

  return (
    <>
      <Link href="/profileEdit">내 프로필 수정</Link>

      <hr />

      <button
        type="button"
        onClick={() => {
          mutate();
          onClick();
          push(asPath);
        }}
      >
        로그아웃
      </button>
    </>
  );
}
