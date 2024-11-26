import PasswordEdit from "@/components/profileEdit/PasswordEdit";
import ProfileEdit from "@/components/profileEdit/ProfileEdit";
import ProfileEditWrapper from "@/components/profileEdit/ProfileEditWrapper";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const accessToken = context.req.cookies.accessToken;

  if (!accessToken) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export default function Home() {
  return (
    <>
      <Head>
        <title>onef - 프로필 수정</title>
      </Head>

      <ProfileEditWrapper title="프로필 수정">
        <ProfileEdit />
      </ProfileEditWrapper>

      <ProfileEditWrapper title="비밀번호 수정">
        <PasswordEdit />
      </ProfileEditWrapper>
    </>
  );
}
