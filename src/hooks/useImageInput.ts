import { Dispatch, SetStateAction, useState, useEffect, ChangeEvent } from "react";

export type ImageInputProps = {
  setFiles: Dispatch<SetStateAction<FileList | undefined>>;
  initialValue?: string;
  file?: File;
};

export const useImageInput = ({ initialValue, setFiles, file }: ImageInputProps) => {
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

  return { preview, handleChange };
};
