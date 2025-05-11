import { useMutation } from "@tanstack/react-query";
import { UserMutation } from "../Domains/User/User.mutation";
import toast from "react-hot-toast";

export const useUserMutation = () => {
  const ChangeProfile = () => {
    const { mutate } = useMutation(new UserMutation().changeProfile());

    const onSubmit = ({
      files,
      nickname,
      bio,
      user,
    }: {
      files: FileList | undefined;
      nickname: string;
      bio: string;
      user: { bio: string; nickname: string };
    }) => {
      const formData = new FormData();

      if (files) {
        Array.from(files).forEach((file) => {
          formData.append("images", file);
        });
      }

      if (user.bio === bio.replace(/\n\s*\n/g, "\n") && user.nickname === nickname && !files)
        return toast.error("변경사항이 없습니다.");

      mutate({ formData, nickname, bio });
    };

    return { onSubmit };
  };

  const ChangePassword = () => {
    return useMutation(new UserMutation().changePassword());
  };

  return { ChangeProfile, ChangePassword };
};
