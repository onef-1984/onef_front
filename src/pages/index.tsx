import fetcher from "@/apis/axios";
import LayoutWrapper from "@/components/layoutWrapper/LayoutWrapper";
import { ChangeEvent, MouseEvent, useState } from "react";

export default function Home() {
  //   const [value, setValue] = useState<File>();
  //   const [imageUrl, setImageUrl] = useState<string>("");

  // const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   const imageFile = e.target.files?.[0];

  //   setValue(imageFile);
  // };

  // const handleClick = async () => {
  //   if (!value) return;

  //   const formData = new FormData();
  //   formData.append("image", value);

  //   try {
  //     const data = await fetcher<{ imageUrl: string }>({
  //       method: "post",
  //       url: "/image/single-upload",
  //       data: formData,
  //     });

  //     setImageUrl(data.imageUrl);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const [value, setValue] = useState<FileList>();
  const [imageUrl, setImageUrl] = useState<string[]>([]);

  const handleMultiChange = (e: ChangeEvent<HTMLInputElement>) => {
    const imageFile = e.target.files!;

    setValue(imageFile);
  };

  const handleMultiClick = async () => {
    if (!value) return;

    const formData = new FormData();
    Array.from(value).forEach((file) => {
      formData.append("images", file);
    });

    try {
      const data = await fetcher<{ imageUrl: string[] }>({
        method: "post",
        url: "/image/multi-upload",
        data: formData,
      });

      console.log(data.imageUrl);

      setImageUrl(data.imageUrl);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <LayoutWrapper>
      {/* <input type="file" onChange={handleChange} />
      <button type="button" onClick={handleClick}>
        팀 버튼
      </button>
      <img src={imageUrl} alt="이미지" /> */}
      <input type="file" accept=".jpeg, .jpg, .png" onChange={handleMultiChange} />
      <button type="button" onClick={handleMultiClick}>
        팀 버튼
      </button>

      {imageUrl.map((url) => (
        <img src={url} alt="이미지" key={url} />
      ))}
    </LayoutWrapper>
  );
}
