import { Query } from "@/apis/Base/Query";
import { GetMeQuery, GetMeQueryVariables, GetUserQuery, GetUserQueryVariables } from "@/types/graphql.types";
import { gql } from "graphql-request";

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

export class UserQuery extends Query {
  constructor() {
    super();
  }

  queryKey = ["user"];

  getMe = () => ({
    queryKey: [...this.queryKey],
    queryFn: () => this.graphql<GetMeQuery, GetMeQueryVariables>(GET_ME),
  });

  getUser = (userNickname: string) => ({
    queryKey: [...this.queryKey, userNickname],
    queryFn: () =>
      this.graphql<GetUserQuery, GetUserQueryVariables>(GET_USER, {
        userNickname,
      }),
  });
}
