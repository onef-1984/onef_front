import LayoutWrapper from "@/components/layoutWrapper/LayoutWrapper";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";

export function getServerSideProps(context: GetServerSidePropsContext) {
  const { cookies } = context.req;

  const accessToken = cookies["accessToken"] ?? "";
  const refreshToken = cookies["refreshToken"] ?? "";

  return { props: { accessToken, refreshToken } };
}

export default function Dashboard({
  accessToken,
  refreshToken,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return <LayoutWrapper>a</LayoutWrapper>;
}
