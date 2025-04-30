import { GetMeQuery, GetUserQuery } from "@/types/graphql.types";

export class UserQueryAdaptor {
  static getUser = (data: GetUserQuery) => ({
    user: {
      id: data.user.id,
      email: data.user.email,
      nickname: data.user.nickname,
      profileImage: data.user.profileImage,
      role: data.user.role ?? "USER",
      bio: data.user.bio,
    },
  });

  static getMe = (data: GetMeQuery) => ({
    user: {
      id: data.user.id,
      email: data.user.email,
      nickname: data.user.nickname,
      profileImage: data.user.profileImage,
      bio: data.user.bio,
    },
  });
}
