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
        <meta name="description" content="책을 읽고 영원을 기록하다" />
        <link rel="icon" href="/images/favicon.png" />

        <meta property="og:url" content="https://onef.co.kr" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="onef" />
        <meta property="og:description" content="책을 읽고 영원을 기록하다" />
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
