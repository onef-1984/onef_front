import Image from "next/image";
import { User } from "@/types/graphql.types";
import baseProfileImage from "/public/images/baseProfileImage.png";

export default function ProfileImage({
  profileImage,
  size,
  id,
}: Pick<User, "profileImage"> & { size: number; id?: string }) {
  return (
    <Image
      id={id}
      draggable={false}
      fill
      src={profileImage || baseProfileImage}
      sizes={String(size)}
      alt="프로필 이미지"
    />
  );
}
