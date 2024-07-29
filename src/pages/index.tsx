import Editor from "@/components/editor/Editor";
import Header from "@/components/header/Header";
import { useState } from "react";

export default function Home() {
  const [value, setValue] = useState("");

  return (
    <>
      <Header />
      <Editor value={value} setValue={setValue} />
    </>
  );
}
