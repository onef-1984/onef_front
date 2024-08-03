import { MutationFn } from "./MutationFn";
import { ImageUrls } from "@/types/image.types";

export class ImageMutation extends MutationFn {
  constructor() {
    super();
  }

  postImages(postType: "multi-upload" | "single-upload") {
    return async (formData: FormData) => {
      const res = await this.mutationFn<ImageUrls>(`/image/${postType}`, "post", formData);

      return res;
    };
  }
}
