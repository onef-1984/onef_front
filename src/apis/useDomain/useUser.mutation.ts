import { useMutation } from "@tanstack/react-query";
import { UserMutation } from "../Domains/User/User.mutation";

export class useUserMutation {
  private userMutation = new UserMutation();

  changeProfile = () => useMutation(this.userMutation.changeProfile());
  changePassword = () => useMutation(this.userMutation.changePassword());
}
