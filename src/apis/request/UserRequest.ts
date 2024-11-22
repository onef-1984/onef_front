import { gql } from "graphql-request";
import { GraphQL } from "../grahpqlClient";
import {
  ChangePasswordMutation,
  ChangePasswordMutationVariables,
  ChangeProfileMutation,
  ChangeProfileMutationVariables,
  GetMeQuery,
  GetMeQueryVariables,
  GetUserQuery,
  GetUserQueryVariables,
} from "@/types/graphql.types";

const UserFragment = gql`
  fragment UserFragment on User {
    id
    email
    nickname
    role
    profileImage
    bio
  }
`;

const GET_ME = gql`
  query getMe {
    user: getMe {
      ...UserFragment
    }
  }
  ${UserFragment}
`;

const GET_USER = gql`
  query getUser($userNickname: String!) {
    user: getUser(userNickname: $userNickname) {
      ...UserFragment
    }
  }
  ${UserFragment}
`;

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

export class UserRequest extends GraphQL {
  constructor() {
    super();
  }

  queryKey = ["user"];

  getMe() {
    return {
      queryKey: [...this.queryKey],
      queryFn: () => this.graphql<GetMeQuery, GetMeQueryVariables>(GET_ME),
    };
  }

  getUser(userNickname: string) {
    return {
      queryKey: [...this.queryKey, userNickname],
      queryFn: () =>
        this.graphql<GetUserQuery, GetUserQueryVariables>(GET_USER, {
          variables: { userNickname },
        }),
    };
  }

  changePassword() {
    return (changePasswordDto: ChangePasswordMutationVariables["changePasswordDto"]) =>
      this.graphql<ChangePasswordMutation, ChangePasswordMutationVariables>(CHANGE_PASSWORD, {
        variables: { changePasswordDto },
      });
  }

  changeProfile() {
    return (changeProfileInput: ChangeProfileMutationVariables["changeProfileInput"]) =>
      this.graphql<ChangeProfileMutation, ChangeProfileMutationVariables>(CHANGE_PROFILE, {
        variables: { changeProfileInput },
      });
  }
}
