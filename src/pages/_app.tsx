import "@/styles/reset.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "@/styles/globals.css";

import { QueryClient, QueryClientProvider, HydrationBoundary } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 30 * 1000,
            retry: 0,
          },
        },
      })
  );

  return (
    <>
      <Head>
        <title>onef</title>
        <meta
          name="description"
          content="Onef는 독후감을 쓰고 공유할 수 있는 플랫폼입니다. 독서 후 느낀 점을 기록하고 다른 사용자와 교류하세요."
        />
        <link rel="icon" href="/images/favicon.png" />

        <meta property="og:url" content="https://onef.co.kr" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="onef" />
        <meta
          property="og:description"
          content="Onef는 독후감을 쓰고 공유할 수 있는 플랫폼입니다. 독서 후 느낀 점을 기록하고 다른 사용자와 교류하세요."
        />
        <meta property="og:image" content="https://onef.co.kr/api/image/preview.webp" />
      </Head>

      <QueryClientProvider client={queryClient}>
        <HydrationBoundary state={pageProps.dehydratedState}>
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: "#fff",
                color: "#363636",
                fontWeight: "bold",
                fontFamily: "Pretendard",
                fontSize: "1.4rem",
              },
            }}
          />

          <Component {...pageProps} />

          <div style={{ fontSize: "2rem" }}>
            <ReactQueryDevtools initialIsOpen={false} />
          </div>
        </HydrationBoundary>
      </QueryClientProvider>
    </>
  );
}
