import { Editor } from "@/components/Editor";
import Header from "@/components/header/Header";
import LayoutWrapper from "@/components/layoutWrapper/LayoutWrapper";
import SideMenu from "@/components/sideMenu/SideMenu";
import { useState } from "react";

export default function Home() {
  const [value, setValue] = useState("");

  console.log(value);

  return (
    <>
      <Header />
      <Editor
        value={value}
        onChange={(value) => {
          setValue(value!);
        }}
      />
    </>
  );
}
