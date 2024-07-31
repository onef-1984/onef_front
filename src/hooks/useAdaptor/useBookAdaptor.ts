import { BookQuery } from "@/apis/reactQuery/Query/BookQuery";
import { useRouteId } from "../useRouteId";
import { useQuery } from "@tanstack/react-query";

export const useBookAdaptor = () => {
  // isbn13 값을 가져옴
  const isbn = useRouteId() as string;

  // isbn13에 해당하는 책 정보를 가져옴
  const bookQuery = new BookQuery();
  const { data } = useQuery(bookQuery.getBook(isbn));

  console.log(data);

  return {
    data,
    book: {
      title: data?.title ?? "",
      cover: data?.cover ?? "",
    },
  };
};
