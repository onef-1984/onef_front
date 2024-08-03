import fetcher from "@/apis/axios";
import ImageInput from "@/components/forms/ImageInput";
import LayoutWrapper from "@/components/layoutWrapper/LayoutWrapper";
import { useUserAdaptor } from "@/hooks/useAdaptor/useUserAdaptor";
import { useProfileImageMutation } from "@/hooks/useMutation/useProfileImageMutation";
import { ChangeEvent, FormEvent, useState } from "react";

export default function Home() {
  const [files, setFiles] = useState<FileList>();
  const { data, mutate } = useProfileImageMutation();
  const { user } = useUserAdaptor();

  const handleSubmit = (files: FileList | undefined) => (e: FormEvent) => {
    e.preventDefault();

    if (!files) return;

    const formData = new FormData();
    Array.from(files).forEach((file) => {
      formData.append("images", file);
    });

    mutate(formData);
  };

  return (
    <LayoutWrapper>
      <form
        style={{
          display: "block",
          height: "50rem",
          width: "100%",
          backgroundColor: "white",
        }}
        onSubmit={handleSubmit(files)}
      >
        <ImageInput setFiles={setFiles} initialValue={user.profileImage} file={files?.[0]} />

        <button>팀 버튼</button>
      </form>
    </LayoutWrapper>
  );
}
