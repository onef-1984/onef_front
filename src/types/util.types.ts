export type UtilFnPick = <T extends Record<string, any>, K extends Array<keyof T>>(obj: T, keys: K) => T;
export type UtilFnOmit = UtilFnPick;
export type Roll<T> = { [k in keyof T]: T[k] } & {};

export type TimeStamp = {
  createdAt: string;
  updatedAt: string;
};

export type Response = {
  statusCode: number;
  message: string;
};
