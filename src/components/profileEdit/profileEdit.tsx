import Button from "../clickable/Button";
import ImageInput from "../forms/ImageInput";
import InputWrapper from "../forms/InputWrapper";
import Label from "../forms/Label";
import Input from "@/components/forms/Input";
import { register, setValue, handleSubmit } from "@/hooks/useSicilian/profile";
import Form from "@/components/forms/Form";
import { useEffect, useState } from "react";
import { useWhoAmIAdaptor } from "@/hooks/useAdaptor/useWhoAmIAdaptor";
import { useProfileMutation } from "@/hooks/useMutation/useProfileMutation";
import TextArea from "../forms/Textarea";

export default function ProfileEdit() {
  const [files, setFiles] = useState<FileList>();
  const { user } = useWhoAmIAdaptor();
  const { mutate } = useProfileMutation();

  const onSubmit = ({ files, nickname, bio }: { files: FileList | undefined; nickname: string; bio: string }) => {
    const formData = new FormData();

    if (files) {
      Array.from(files).forEach((file) => {
        formData.append("images", file);
      });
    }

    mutate({ formData, nickname, bio });
  };

  useEffect(() => {
    setValue({ email: user.email, nickname: user.nickname, bio: user.bio });
  }, [user.nickname, user.bio]);

  return (
    <Form
      onSubmit={handleSubmit((data) => onSubmit({ files, ...data }))}
      inputWrapper={
        <>
          <div>
            <InputWrapper
              inputName={"프로필 이미지"}
              label={
                <div style={{ width: "10rem", height: "10rem" }}>
                  <ImageInput setFiles={setFiles} initialValue={user.profileImage} file={files?.[0]} />
                </div>
              }
            ></InputWrapper>

            <div>
              <InputWrapper
                inputName={"이메일"}
                label={<Label htmlFor="nickname" input={() => Input({ ...register("email"), disabled: true })}></Label>}
              ></InputWrapper>

              <InputWrapper
                inputName={"닉네임"}
                label={<Label htmlFor="nickname" input={() => Input({ ...register("nickname") })}></Label>}
              ></InputWrapper>
            </div>
          </div>

          <InputWrapper
            inputName={"자기소개"}
            label={<Label htmlFor="bio" input={() => TextArea({ ...register("bio") })}></Label>}
          ></InputWrapper>
        </>
      }
      button={<Button>저장</Button>}
    />
  );
}
