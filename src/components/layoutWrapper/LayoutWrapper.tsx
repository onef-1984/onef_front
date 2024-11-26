import { ReactNode } from "react";
import Header from "./header/Header";
import SideMenu from "./sideMenu/SideMenu";
import styles from "./LayoutWrapper.module.css";

export default function LayoutWrapper({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />

      <SideMenu />

      <main className={styles.main}>{children}</main>
    </>
  );
}
