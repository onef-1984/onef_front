export type UtilFnPick = <T extends Record<string, string>, K extends Array<keyof T>>(obj: T, keys: K) => T;
export type UtilFnOmit = UtilFnPick;

export type SignData = {
  email: string;
  password: string;
  nickname?: string;
};
