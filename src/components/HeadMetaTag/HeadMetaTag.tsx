import Head from "next/head";

export default function HeadMetaTag({
  title,
  description = "책을 읽고 영원을 기록하다",
  image = "https://onef.co.kr/api/image/preview.webp",
}: {
  title: string;
  description?: string;
  image?: string;
}) {
  return (
    <Head>
      <title>{`onef - ${title}`}</title>

      <meta name="title" content={`onef - ${title}`} />
      <meta name="description" content={description} />
      <meta name="thumbnail" content={image} />

      <meta name="twitter:title" content={`onef - ${title}`} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      <meta property="og:title" content={`onef - ${title}`} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
    </Head>
  );
}
