import Button from "../clickable/Button";
import ImageInput from "../forms/ImageInput";
import InputWrapper from "../forms/InputWrapper";
import Label from "../forms/Label";
import Input from "@/components/forms/Input";
import { register, setValue, handleSubmit } from "@/hooks/useSicilian/profileEdit";
import Form from "@/components/forms/Form";
import { useEffect, useState } from "react";
import { useWhoAmIAdaptor } from "@/hooks/useAdaptor/useWhoAmIAdaptor";
import { usePatchProfileMutation } from "@/hooks/useMutation/usePatchProfileMutation";
import Textarea from "../forms/Textarea";
import styles from "./ProfileEdit.module.css";

export default function ProfileEdit() {
  const [files, setFiles] = useState<FileList>();
  const { user } = useWhoAmIAdaptor();
  const { mutate } = usePatchProfileMutation();

  useEffect(() => {
    setValue({ ...user });
  }, [user]);

  const onSubmit = ({ files, nickname, bio }: { files: FileList | undefined; nickname: string; bio: string }) => {
    const formData = new FormData();

    if (files) {
      Array.from(files).forEach((file) => {
        formData.append("images", file);
      });
    }

    mutate({ formData, nickname, bio });
  };

  return (
    <Form
      className={styles.root}
      onSubmit={handleSubmit((data) => onSubmit({ files, ...data }))}
      inputWrapper={
        <>
          <div className={styles.inputContainer}>
            <div className={styles.imageContainer}>
              <InputWrapper
                label={<ImageInput setFiles={setFiles} initialValue={user.profileImage} file={files?.[0]} />}
              />
            </div>

            <div className={styles.emailNicknameContainer}>
              <InputWrapper
                inputName={"이메일"}
                label={<Label htmlFor="email" input={() => Input({ ...register("email"), disabled: true })}></Label>}
              />

              <InputWrapper
                inputName={"닉네임"}
                label={<Label htmlFor="nickname" input={() => Input({ ...register("nickname") })}></Label>}
              />
            </div>
          </div>

          <InputWrapper
            inputName={"소개"}
            label={
              <Label htmlFor="bio" input={() => Textarea({ ...register("bio"), className: styles.textarea })}></Label>
            }
          ></InputWrapper>
        </>
      }
      button={<Button className={styles.button}>저장</Button>}
    />
  );
}
