import { register, setValues, handleSubmit, getErrors } from "@/hooks/useSicilian/profileEdit";
import { useEffect, useState } from "react";
import { SicilianProvider } from "sicilian/provider";
import styles from "./ProfileEdit.module.css";
import toast from "react-hot-toast";
import Form from "@/components/forms/Form";
import Clickable from "../clickable/Clickable";
import { useUserQuery } from "@/apis/useDomain/useUser.query";
import { useUserMutation } from "@/apis/useDomain/useUser.mutation";
export default function ProfileEdit() {
  const [files, setFiles] = useState<FileList>();

  const { isPending, data } = new useUserQuery().getMe();
  const { mutate: changeProfileMutate } = new useUserMutation().changeProfile();

  useEffect(() => {
    setValues({ email: data?.user.email, nickname: data?.user.nickname, bio: data?.user.bio ?? "" });
  }, [isPending, data]);

  if (!data) return null;

  const onSubmit = ({ files, nickname, bio }: { files: FileList | undefined; nickname: string; bio: string }) => {
    const formData = new FormData();

    if (files) {
      Array.from(files).forEach((file) => {
        formData.append("images", file);
      });
    }

    if (data.user.bio === bio.replace(/\n\s*\n/g, "\n") && data.user.nickname === nickname && !files)
      return toast.error("변경사항이 없습니다.");

    changeProfileMutate({ formData, nickname, bio });
  };

  return (
    <Form
      className={styles.root}
      onSubmit={handleSubmit((data) =>
        onSubmit({ files, nickname: data.nickname, bio: data.bio.replace(/\n\s*\n/g, "\n") }),
      )}
    >
      <Form.ImageInput
        setFiles={setFiles}
        className={styles.imageContainer}
        initialValue={data.user.profileImage ?? undefined}
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
          <Form.Textarea initValue={data.user.bio ?? ""} className={styles.textarea} />
        </Form.InputWrapper>
      </SicilianProvider>

      <Clickable>저장</Clickable>
    </Form>
  );
}
