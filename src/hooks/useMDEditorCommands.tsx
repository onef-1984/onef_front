import fetcher from "@/apis/axios";
import { ICommand, TextAreaTextApi, TextState } from "@uiw/react-md-editor";
import { useEffect, useState } from "react";
import { MdInsertPhoto } from "@react-icons/all-files/md/MdInsertPhoto";

export const useMDEditorCommands = () => {
  const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("image", file);

    const response = await fetcher<{ imageUrl: string }>({
      url: "/image/single-upload",
      method: "POST",
      data: formData,
    });

    return response.imageUrl;
  };

  const commands = import("@uiw/react-md-editor").then((a) => {
    return a.commands;
  });

  const extraCommands = import("@uiw/react-md-editor").then((a) => {
    return a;
  });

  const imageCommand: ICommand = {
    name: "image",
    keyCommand: "image",
    buttonProps: { "aria-label": "Add image" },
    icon: (
      <>
        <MdInsertPhoto style={{ fontSize: "12px" }} />
      </>
    ),
    execute: async (state: TextState, api: TextAreaTextApi) => {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";
      input.onchange = async () => {
        if (input.files) {
          const file = input.files[0];
          const imageUrl = await uploadImage(file);
          console.log(imageUrl);
          api.replaceSelection(`![](${imageUrl})`);
        }
      };
      input.click();
    },
  };

  const [command, setCommand] = useState<Array<ICommand>>([]);
  const [extraCommand, setExtraCommand] = useState<Array<ICommand>>([]);

  useEffect(() => {
    commands.then((a) => {
      setCommand(a.getCommands());
    });
    extraCommands.then((a) => {
      setExtraCommand(a.getExtraCommands());
    });
  }, []);

  return { imageCommand, command, extraCommand };
};
