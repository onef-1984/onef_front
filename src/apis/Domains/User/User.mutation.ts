import { Mutation } from "@/apis/Base/Mutation";
import { ClientError, gql } from "graphql-request";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { ImageMutation } from "@/apis/reactQuery/Mutation/ImageMutation";
import {
  ChangePasswordMutationVariables,
  ChangePasswordMutation,
  ChangeProfileMutationVariables,
  ChangeProfileMutation,
} from "@/types/graphql.types";

const CHANGE_PROFILE = gql`
  mutation changeProfile($changeProfileInput: ChangeProfileInput!) {
    changeProfile(changeProfileInput: $changeProfileInput) {
      message
    }
  }
`;

const CHANGE_PASSWORD = gql`
  mutation changePassword($changePasswordDto: ChangePasswordInput!) {
    changePassword(changePasswordDto: $changePasswordDto) {
      message
    }
  }
`;

export class UserMutation extends Mutation {
  private queryClient = useQueryClient();

  constructor() {
    super();
  }

  changePassword() {
    return this.mutationOptions({
      mutationFn: (changePasswordDto: ChangePasswordMutationVariables["changePasswordDto"]) =>
        this.graphql<ChangePasswordMutation, ChangePasswordMutationVariables>(CHANGE_PASSWORD, {
          changePasswordDto,
        }),
      onSuccess: () => {
        toast.success("비밀번호가 변경되었습니다.");
        this.queryClient.invalidateQueries({ queryKey: ["user"] });
      },
      onError: (error: ClientError) => {
        toast.error(error.response.errors?.[0].message || "비밀번호 변경에 실패했습니다.");
      },
    });
  }

  changeProfile() {
    return this.mutationOptions({
      mutationFn: async ({ formData, nickname, bio }: { formData: FormData; nickname: string; bio: string }) => {
        const imageMutation = new ImageMutation();
        const { imageUrl } = await imageMutation.postImages("multi-upload")(formData);

        await this.graphql<ChangeProfileMutation, ChangeProfileMutationVariables>(CHANGE_PROFILE, {
          changeProfileInput: { profileImage: imageUrl[0], nickname, bio },
        });
      },
      onSuccess: () => {
        toast.success("프로필이 변경되었습니다.");
        this.queryClient.invalidateQueries({ queryKey: ["user"], refetchType: "all" });
      },
      onError: (error: ClientError) => {
        toast.error(error.response.errors?.[0].message || "프로필 변경에 실패했습니다.");
      },
    });
  }
}
