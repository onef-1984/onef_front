import { Mutation } from "@/apis/Base/Mutation";
import { ImageUrls } from "@/types/image.types";

export class ImageMutation extends Mutation {
  constructor() {
    super();
  }

  postImages(postType: "multi-upload" | "single-upload") {
    return (formData: FormData) => this.mutationFn<ImageUrls>(`/image/${postType}`, "post", formData);
  }
}
