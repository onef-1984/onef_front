export type SignData = {
  email: string;
  password: string;
  nickname?: string;
};

export type User = {
  id: string;
  role: "USER" | "ADMIN";
  email: string;
  nickname: string;
  profileImage?: string;
  bio?: string;
};
