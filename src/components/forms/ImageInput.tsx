import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "./ImageInput.module.css";
import clsx from "clsx";
import { LuPen } from "react-icons/lu";

type ImageInputProps = {
  multiple?: boolean;
  setFiles: Dispatch<SetStateAction<FileList | undefined>>;
  initialValue?: string;
  file?: File;
};

export default function ImageInput({ multiple = false, initialValue, setFiles, file }: ImageInputProps) {
  const [preview, setPreview] = useState<string | undefined>("");

  useEffect(() => {
    setPreview(initialValue);
  }, [initialValue]);

  useEffect(() => {
    if (!file) return;

    const nextPreview = URL.createObjectURL(file);
    setPreview(nextPreview);

    return () => {
      setPreview("");
      URL.revokeObjectURL(nextPreview);
    };
  }, [file]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    setFiles(e.target.files);
  };

  return (
    <label
      htmlFor="image"
      className={clsx(styles.root)}
      style={{
        width: "100%",
        height: "100%",
        backgroundImage: `url(${preview})`,
      }}
    >
      <input
        id="image"
        type="file"
        style={{ display: "none" }}
        multiple={multiple}
        accept=".jpeg, .jpg, .png"
        onChange={handleChange}
      />

      <div className={styles.hoverCover}>
        <LuPen />
      </div>
    </label>
  );
}
