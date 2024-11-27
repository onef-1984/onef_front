import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="ko">
      <Head>
        <Script src="https://unpkg.com/react-scan/dist/auto.global.js"></Script>

        <link
          rel="preload"
          href="/fonts/PretendardVariable.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link rel="icon" href="/images/favicon.png" />
        {/* <link rel="canonical" href="https://onef.co.kr" /> */}

        <meta name="twitter:card" content="summary_large_image" />
        {/* <meta name="twitter:url" content="https://onef.co.kr" /> */}

        <meta property="og:site_name" content="onef" />
        <meta property="og:locale" content="ko_KR" />
        {/* <meta property="og:url" content="https://onef.co.kr" /> */}
        <meta property="og:type" content="website" />
      </Head>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
