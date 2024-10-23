import { register, setForm, handleSubmit, ErrorState, FormState } from "@/hooks/useSicilian/profileEdit";
import { useEffect, useState } from "react";
import { useWhoAmIAdaptor } from "@/hooks/useAdaptor/user/useWhoAmIAdaptor";
import { usePatchProfileMutation } from "@/hooks/useMutation/usePatchProfileMutation";
import styles from "./ProfileEdit.module.css";
import toast from "react-hot-toast";
import Form from "@/components/forms/Form";
import Clickable from "../clickable/Clickable";

export default function ProfileEdit() {
  const [files, setFiles] = useState<FileList>();
  const { user, isPending } = useWhoAmIAdaptor();
  const { mutate } = usePatchProfileMutation();
  const errorState = ErrorState();
  const formState = FormState();

  useEffect(() => {
    setForm({ email: user.email, nickname: user.nickname, bio: user.bio });
  }, [isPending]);

  const onSubmit = ({ files, nickname, bio }: { files: FileList | undefined; nickname: string; bio: string }) => {
    const formData = new FormData();

    if (files) {
      Array.from(files).forEach((file) => {
        formData.append("images", file);
      });
    }

    if (user.bio === formState.bio.replace(/\n\s*\n/g, "\n") && user.nickname === formState.nickname && !files)
      return toast.error("변경사항이 없습니다.");

    mutate({ formData, nickname, bio });
  };

  return (
    <Form
      className={styles.root}
      onSubmit={handleSubmit((data) =>
        onSubmit({ files, nickname: data.nickname, bio: data.bio.replace(/\n\s*\n/g, "\n") }),
      )}
    >
      <>
        <div className={styles.inputContainer}>
          <div className={styles.imageContainer}>
            <Form.ImageInput setFiles={setFiles} initialValue={user.profileImage} file={files?.[0]} />
          </div>

          <div className={styles.emailNicknameContainer}>
            <Form.InputWrapper inputName={"이메일"} htmlFor="email">
              <Form.Input {...register("email")} disabled={true} />
            </Form.InputWrapper>

            <Form.InputWrapper inputName={"닉네임"} htmlFor="nickname">
              <Form.Input {...register("nickname")} />
            </Form.InputWrapper>
          </div>
        </div>

        <Form.InputWrapper inputName={"소개"} errorMessage={errorState.bio} htmlFor="bio">
          <Form.Textarea
            {...register("bio", {
              maxLength: { number: 150, message: "소개글은 150자를 넘길 수 없습니다." },
            })}
            className={styles.textarea}
          />
        </Form.InputWrapper>
      </>

      <Clickable className={styles.button}>저장</Clickable>
    </Form>
  );
}
