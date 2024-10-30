import { ReactNode } from "react";
import { useRouterAdv } from "@/hooks/useRouterAdv";
import { usePopUpToggle } from "@/hooks/usePopUpToggle";
import { useSignOutMutation } from "@/hooks/useMutation/useSignOutMutation";
import { josa } from "es-hangul";
import { MdClose } from "@react-icons/all-files/md/MdClose";
import useNotification from "@/hooks/useSocket/useNotification";
import Clickable from "../clickable/Clickable";
import ProfileImage from "../Profile/ProfileImage";
import Link from "next/link";
import Map from "../util/Map";
import Show from "../util/Show";
import clsx from "clsx";
import styles from "./PopUp.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import fetcher from "@/apis/axios";

type PopUpProps = {
  position: "left" | "right";
  children: ReactNode;
  when: boolean;
};

export default function PopUp({
  id,
  children,
  popUp,
  position,
  className,
}: {
  position: "left" | "right";
  id: string;
  className?: string;
  popUp: ReactNode;
  children: (id: string) => ReactNode;
}) {
  const { toggle, handleToggle } = usePopUpToggle(id);

  return (
    <div className={styles.root}>
      <button type="button" className={className} onClick={handleToggle}>
        {children(id)}
      </button>

      <PopUp.Wrapper when={toggle} position={position}>
        {popUp}
      </PopUp.Wrapper>
    </div>
  );
}

PopUp.Wrapper = ({ position, children, when }: PopUpProps) => {
  return (
    <Show when={when}>
      <div className={clsx(styles.wrapper, styles[position])}>{children}</div>
    </Show>
  );
};

PopUp.SearchOption = function SearchOptionPopUp() {
  const { query, push, location } = useRouterAdv();

  const handleClick = (orderBy: string) => () => {
    push({ pathname: location, query: { ...query, orderBy } }, location);
  };

  return (
    <>
      <Clickable color="borderless" type="button" onClick={handleClick("createdAt")}>
        최신순
      </Clickable>

      <Clickable color="borderless" type="button" onClick={handleClick("userLiked")}>
        인기순
      </Clickable>
    </>
  );
};

PopUp.Profile = function ProfilePopUp() {
  const { mutate } = useSignOutMutation();
  const { push, asPath } = useRouterAdv();
  const handleClick = () => {
    mutate();
    push(asPath);
  };

  return (
    <>
      <Clickable Component={Link} color="borderless" href="/profileEdit">
        내 프로필 수정
      </Clickable>

      <hr />

      <Clickable color="borderless" type="button" onClick={handleClick}>
        로그아웃
      </Clickable>
    </>
  );
};

PopUp.Notification = function NotificationPopUp({
  id,
  sender,
  report,
  title,
  link,
  description,
}: ReturnType<typeof useNotification>["data"][number]) {
  const queryClient = useQueryClient();
  const { mutate: deleteMutate } = useMutation({
    mutationFn: () => {
      return fetcher({ url: `/notification/${id}`, method: "DELETE" });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notification"], refetchType: "all" });
    },
  });
  const { mutate: patchMutate } = useMutation({
    mutationFn: () => {
      return fetcher({ url: `/notification/${id}`, method: "PATCH", data: { isRead: true } });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notification"], refetchType: "all" });
    },
  });

  return (
    <div className={styles.notificationRoot}>
      <ProfileImage size={24} profileImage={sender.profileImage} />

      <div className={styles.notification}>
        <div className={styles.notificationHeader}>
          <div>
            <Link href={`/dashboard/${sender.nickname}`} className={styles.nickname}>
              {sender.nickname}
            </Link>{" "}
            · 방금 전
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              deleteMutate();
            }}
          >
            <MdClose />
          </button>
        </div>

        <Link href={link} onClick={() => patchMutate()}>
          <div className={styles.title}>{title}</div>

          <div>
            {josa(report.title, "을/를")} {description}
          </div>
        </Link>
      </div>
    </div>
  );
};
