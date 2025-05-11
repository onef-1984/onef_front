import { register, setValues, handleSubmit, getErrors } from "@/hooks/useSicilian/profileEdit";
import { useEffect, useState } from "react";
import { SicilianProvider } from "sicilian/provider";
import styles from "./ProfileEdit.module.css";
import Form from "@/components/forms/Form";
import Clickable from "../clickable/Clickable";
import { useUserQuery } from "@/apis/useDomain/useUser.query";
import { useUserMutation } from "@/apis/useDomain/useUser.mutation";

export default function ProfileEdit() {
  const [files, setFiles] = useState<FileList>();
  const {
    isPending,
    data: { user },
  } = useUserQuery().GetMe();
  const { onSubmit } = useUserMutation().ChangeProfile();

  useEffect(() => {
    setValues({ email: user.email, nickname: user.nickname, bio: user.bio ?? "" });
  }, [isPending, user]);

  return (
    <Form
      className={styles.root}
      onSubmit={handleSubmit((data) =>
        onSubmit({ files, nickname: data.nickname, bio: data.bio.replace(/\n\s*\n/g, "\n"), user }),
      )}
    >
      <Form.ImageInput
        setFiles={setFiles}
        className={styles.imageContainer}
        initialValue={user.profileImage ?? undefined}
        file={files?.[0]}
      />

      <SicilianProvider value={{ register, name: "email", getErrors }}>
        <Form.InputWrapper inputName={"이메일"}>
          <Form.Input disabled={true} />
        </Form.InputWrapper>
      </SicilianProvider>

      <SicilianProvider value={{ register, name: "nickname", getErrors }}>
        <Form.InputWrapper inputName={"닉네임"}>
          <Form.Input />
        </Form.InputWrapper>
      </SicilianProvider>

      <SicilianProvider value={{ register, name: "bio", getErrors }}>
        <Form.InputWrapper className={styles.bio} inputName={"소개"}>
          <Form.Textarea initValue={user.bio ?? ""} className={styles.textarea} />
        </Form.InputWrapper>
      </SicilianProvider>

      <Clickable>저장</Clickable>
    </Form>
  );
}
