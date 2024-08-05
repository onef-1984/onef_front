import "@/styles/reset.css";
import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider, HydrationBoundary } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Head from "next/head";

// import localFont from "next/font/local";
// const pretendard = localFont({
//   src: "../../public/fonts/PretendardVariable.woff2",
//   display: "swap",
//   weight: "45 920",
// });

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            retry: 0,
          },
        },
      })
  );

  return (
    <>
      <Head>
        <title>TRIMO</title>
        <meta name="description" content="쉽고 간편한 여행 리뷰, 지금 바로 작성해보세요!" />
        <link rel="icon" href="/icons/favicon.png" />

        <meta property="og:url" content="https://www.trimo.kr/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="TRIMO" />
        <meta property="og:description" content="쉽고 간편한 여행 리뷰, 지금 바로 작성해보세요!" />
        <meta property="og:image" content="https://github.com/Odagada/Trimo-FE/blob/develop/public/logos/preview.png" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <HydrationBoundary state={pageProps.dehydratedState}>
          <ToastContainer />
          <Component {...pageProps} />
          <div style={{ fontSize: "2rem" }}>
            <ReactQueryDevtools initialIsOpen={false} />
          </div>
        </HydrationBoundary>
      </QueryClientProvider>
    </>
  );
}
