export type UtilFnPick = <T extends Record<string, any>, K extends Array<keyof T>>(
  obj: T,
  keys: K,
) => Pick<T, K[number]>;
export type UtilFnOmit = <T extends Record<string, any>, K extends Array<keyof T>>(
  obj: T,
  keys: K,
) => Omit<T, K[number]>;

export type Roll<T> = { [k in keyof T]: T[k] } & {};

export type TimeStamp = {
  createdAt: string;
  updatedAt: string;
};

export type Response = {
  statusCode: number;
  message: string;
};

export type OrderBy = "createdAt" | "userLiked";

export type SearchType = "report" | "book" | "user" | "tag" | "userLiked";
export type UserLikedCount = { userLiked: number };
