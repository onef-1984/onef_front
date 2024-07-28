import Header from "@/components/header/Header";
import LayoutWrapper from "@/components/layoutWrapper/LayoutWrapper";
import SideMenu from "@/components/sideMenu/SideMenu";
import { useState } from "react";

export default function Home() {
  const [value, setValue] = useState("");

  return (
    <>
      <Header />
      <textarea
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
    </>
  );
}
