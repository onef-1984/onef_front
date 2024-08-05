import { useSignOutMutation } from "@/hooks/useMutation/useSignOutMutation";
import Link from "next/link";

type HeaderPopProps = {
  onClick: () => void;
};

export default function HeaderPop({ onClick }: HeaderPopProps) {
  const { mutate } = useSignOutMutation();

  return (
    <>
      <Link href="/my/info">내 프로필 수정</Link>

      <hr />

      <button
        type="button"
        onClick={() => {
          onClick();

          mutate();
        }}
      >
        로그아웃
      </button>
    </>
  );
}
