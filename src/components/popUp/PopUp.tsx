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
import Show from "../util/Show";
import clsx from "clsx";
import styles from "./PopUp.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import fetcher from "@/apis/axios";

import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import { useNotificationMutation } from "@/hooks/useMutation/useNotificationMutation";

function formatCreatedAt(createdAt: Date) {
  return formatDistanceToNow(new Date(createdAt), { addSuffix: true, locale: ko });
}

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
  isRead,
  createdAt,
}: ReturnType<typeof useNotification>["data"][number]) {
  const { deleteMutate, patchMutate } = useNotificationMutation();

  return (
    <div className={styles.notificationRoot}>
      <div className={styles.notificationProfileImage}>
        <ProfileImage size={24} profileImage={sender.profileImage} />
      </div>

      <div className={styles.notification}>
        <div className={styles.notificationHeader}>
          <div>
            <Link href={`/dashboard/${sender.nickname}`} className={styles.nickname}>
              {sender.nickname}
            </Link>{" "}
            · {isRead ? "읽음" : formatCreatedAt(createdAt)}
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              deleteMutate({ id });
            }}
          >
            <MdClose />
          </button>
        </div>

        <Link href={link} onClick={() => patchMutate({ id })}>
          <div className={styles.title}>{title}</div>

          <div>
            {josa(report.title, "을/를")} {description}
          </div>
        </Link>
      </div>
    </div>
  );
};
