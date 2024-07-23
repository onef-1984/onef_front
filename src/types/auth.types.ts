export type SignData = {
  email: string;
  password: string;
  nickname?: string;
};

export type User = {
  id: string;
  email: string;
  nickname: string;
  profileImage?: string;
};
