import { useReviewAdaptor } from "@/hooks/useAdaptor/useReviewAdaptor";
import { useRouter } from "next/router";

export default function Review() {
  const { report, error } = useReviewAdaptor();
  const router = useRouter();

  if (error) {
    alert("존재하지 않는 게시글입니다");
    router.push("/");
  }

  return (
    <div>
      <h1>{report.title}</h1>
    </div>
  );
}
