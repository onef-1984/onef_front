import { register, setValues, handleSubmit, getErrors } from "@/hooks/useSicilian/profileEdit";
import { useEffect, useState } from "react";
import { useWhoAmIAdaptor } from "@/hooks/useAdaptor/user/useWhoAmIAdaptor";
import { SicilianProvider } from "sicilian/provider";
import styles from "./ProfileEdit.module.css";
import toast from "react-hot-toast";
import Form from "@/components/forms/Form";
import Clickable from "../clickable/Clickable";
import { useUserMutator } from "@/hooks/useMutation/useUserMutator";

export default function ProfileEdit() {
  const [files, setFiles] = useState<FileList>();
  const { user, isPending } = useWhoAmIAdaptor();
  const { ChangeProfileMutate } = useUserMutator();

  useEffect(() => {
    setValues({ email: user.email, nickname: user.nickname, bio: user.bio });
  }, [isPending, user]);

  const onSubmit = ({ files, nickname, bio }: { files: FileList | undefined; nickname: string; bio: string }) => {
    const formData = new FormData();

    if (files) {
      Array.from(files).forEach((file) => {
        formData.append("images", file);
      });
    }

    if (user.bio === bio.replace(/\n\s*\n/g, "\n") && user.nickname === nickname && !files)
      return toast.error("변경사항이 없습니다.");

    ChangeProfileMutate({ formData, nickname, bio });
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
        initialValue={user.profileImage}
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
          <Form.Textarea initValue={user.bio} className={styles.textarea} />
        </Form.InputWrapper>
      </SicilianProvider>

      <Clickable>저장</Clickable>
    </Form>
  );
}
