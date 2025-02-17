import { UserMutation } from "@/apis/Domains/User/User.mutation";
import { useMutation } from "@tanstack/react-query";

export const useUserMutator = () => {
  const userMutation = new UserMutation();

  const { mutate: ChangeProfileMutate } = useMutation(userMutation.changeProfile());
  const { mutate: ChangePasswordMutate } = useMutation(userMutation.changePassword());

  return { ChangeProfileMutate, ChangePasswordMutate };
};
