import clsx from "clsx";
import styles from "./PopUp.module.css";
import { ReactNode } from "react";
import Show from "../util/Show";
import { useRouterAdv } from "@/hooks/useRouterAdv";
import Clickable from "../clickable/Clickable";
import { usePopUpToggle } from "@/hooks/usePopUpToggle";
import { useSignOutMutation } from "@/hooks/useMutation/useSignOutMutation";
import Link from "next/link";

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
