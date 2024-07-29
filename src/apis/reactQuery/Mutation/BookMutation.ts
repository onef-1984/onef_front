import { MutationFn } from "./MutationFn";
import { Item } from "@/types/book.types";

export class BookMutation extends MutationFn {
  constructor() {
    super();
  }

  postBook() {
    return (data: Item | undefined) => this.mutationFn<Pick<Item, "isbn13">>("/book", "post", data);
  }
}
