import Image from "next/image";
import logo from "@/../public/images/logo.svg";
import Link from "next/link";
import styles from "./Logo.module.css";

export default function Logo() {
  return (
    <Link href="/" className={styles.root}>
      <Image fill priority src={logo} alt="logo" />
    </Link>
  );
}
