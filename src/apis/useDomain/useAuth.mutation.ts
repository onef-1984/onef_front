import { useMutation } from "@tanstack/react-query";
import { AuthMutation } from "../Domains/AuthMutation";

export const useAuthMutation = () => {
  const PostSocialSign = () => {
    return useMutation(new AuthMutation().postSocialSign());
  };
  const DeleteSignOut = () => {
    return useMutation(new AuthMutation().deleteSignOut());
  };
  const PostSign = (url: string) => {
    return useMutation(new AuthMutation().postSign(url));
  };

  return { PostSocialSign, DeleteSignOut, PostSign };
};
