import ImageInput from "@/components/forms/ImageInput";
import InputWrapper from "@/components/forms/InputWrapper";
import Label from "@/components/forms/Label";
import LayoutWrapper from "@/components/layoutWrapper/LayoutWrapper";
import { useWhoAmIAdaptor } from "@/hooks/useAdaptor/useWhoAmIAdaptor";
import { useProfileMutation } from "@/hooks/useMutation/useProfileMutation";
import { FormEvent, useEffect, useState } from "react";
import Input from "@/components/forms/Input";
import { register, setValue } from "@/hooks/useSicilian/profile";
import Form from "@/components/forms/Form";

export default function Home() {
  const [files, setFiles] = useState<FileList>();
  const { mutate } = useProfileMutation();
  const { user } = useWhoAmIAdaptor();

  const handleSubmit = (files: FileList | undefined) => (e: FormEvent) => {
    e.preventDefault();

    if (!files) return;

    const formData = new FormData();
    Array.from(files).forEach((file) => {
      formData.append("images", file);
    });

    mutate({ formData, nickname: user.nickname });
  };

  useEffect(() => {
    setValue({ nickname: user.nickname });
  }, [user.nickname]);

  return (
    <LayoutWrapper>
      <Form
        onSubmit={handleSubmit(files)}
        inputWrapper={
          <>
            <InputWrapper
              inputName={"프로필 이미지"}
              label={
                <div style={{ width: "10rem", height: "10rem" }}>
                  <ImageInput setFiles={setFiles} initialValue={user.profileImage} file={files?.[0]} />
                </div>
              }
            ></InputWrapper>

            <InputWrapper
              inputName={"닉네임"}
              label={<Label htmlFor="email" input={(type) => Input({ ...register(type) })}></Label>}
            ></InputWrapper>
          </>
        }
        button={<button>저장</button>}
      ></Form>
    </LayoutWrapper>
  );
}
