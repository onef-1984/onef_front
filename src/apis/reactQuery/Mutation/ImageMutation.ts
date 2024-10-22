import { MutationFn } from "./MutationFn";
import { ImageUrls } from "@/types/image.types";

export class ImageMutation extends MutationFn {
  constructor() {
    super();
  }

  postImages(postType: "multi-upload" | "single-upload") {
    return (formData: FormData) => this.mutationFn<ImageUrls>(`/image/${postType}`, "post", formData);
  }
}
