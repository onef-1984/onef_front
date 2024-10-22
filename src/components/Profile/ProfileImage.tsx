import { BsPeopleCircle } from "@react-icons/all-files/bs/BsPeopleCircle";
import { Show } from "../util/Show";
import { User } from "@/types/auth.types";
import Image from "next/image";

export default function ProfileImage({ profileImage, size }: Pick<User, "profileImage"> & { size: number }) {
  return (
    <Show when={!!profileImage} fallback={<BsPeopleCircle />}>
      <Image draggable={false} fill src={profileImage!} sizes={String(size)} alt="프로필 이미지" />
    </Show>
  );
}
