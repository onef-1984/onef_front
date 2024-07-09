import { useReviewAdaptor } from "@/hooks/useAdaptor/useReviewAdaptor";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Review() {
  const { statusCode, report } = useReviewAdaptor();

  const router = useRouter();

  useEffect(() => {
    if (statusCode! > 200) {
      router.push(`/${statusCode}`);
    }
  }, [statusCode, router]);

  return (
    <div>
      <h1>{report.title}</h1>
    </div>
  );
}
