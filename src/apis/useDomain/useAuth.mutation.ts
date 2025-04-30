import { useMutation } from "@tanstack/react-query";
import { AuthMutation } from "../Domains/AuthMutation";

export class useAuthMutation {
  private authMutation = new AuthMutation();

  postSocialSign = () => useMutation(this.authMutation.postSocialSign());
  deleteSignOut = () => useMutation(this.authMutation.deleteSignOut());
  postSign = (url: string) => useMutation(this.authMutation.postSign(url));
}
