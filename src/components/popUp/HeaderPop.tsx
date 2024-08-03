import { useSignOutMutation } from "@/hooks/useMutation/useSignOutMutation";
import { useRouter } from "next/router";

type HeaderPopProps = {
  onClick: () => void;
};

export default function HeaderPop({ onClick }: HeaderPopProps) {
  const { push } = useRouter();
  const { mutate } = useSignOutMutation();

  return (
    <>
      <button type="button" onClick={() => push("/profileEdit")}>
        내 프로필 수정
      </button>

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
