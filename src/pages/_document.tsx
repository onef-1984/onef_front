import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="ko">
      <Head>
        <link
          rel="preload"
          href="/fonts/PretendardVariable.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />

        <meta name="description" content="책을 읽고 영원을 기록하다" />
        <link rel="icon" href="/images/favicon.png" />

        <meta property="og:url" content="https://onef.co.kr" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="onef" />
        <meta property="og:description" content="책을 읽고 영원을 기록하다" />
        <meta property="og:image" content="https://onef.co.kr/api/image/preview.webp" />
      </Head>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
