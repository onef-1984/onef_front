import { Query } from "@/apis/Base/Query";
import {
  GetAllBookDataQuery,
  GetAllBookDataQueryVariables,
  GetBookListQuery,
  GetBookListQueryVariables,
  GetBookQuery,
  GetBookQueryVariables,
} from "@/types/graphql.types";
import { gql } from "graphql-request";

export const ALL_BOOK = gql`
  fragment AllBook on BookObject {
    isbn13
    title
    author
    description
    cover
    categoryId
    categoryName
    pubDate
    publisher
    priceStandard
    customerReviewRank
  }
`;

const ALL_SUB_INFO = gql`
  fragment AllBookSubInfo on SubInfoObject {
    itemPage
    subTitle
    originalTitle
    weight
    sizeDepth
    sizeHeight
    sizeWidth
  }
`;

const GET_BOOK_BY_ISBN = gql`
  query getBook($isbn13: String!) {
    book: getBook(isbn13: $isbn13) {
      ...AllBook
      subInfo {
        itemPage
      }
    }
  }
  ${ALL_BOOK}
`;

const GET_ALL_BOOK_DATA = gql`
  query getAllBookData($isbn13: String!) {
    book: getBook(isbn13: $isbn13) {
      ...AllBook
      subInfo {
        ...AllBookSubInfo
      }
    }
  }
  ${ALL_BOOK}
  ${ALL_SUB_INFO}
`;

const GET_BOOK_LIST = gql`
  query getBookList($BookSearchInput: BookSearchInput!) {
    bookList: getBookList(bookSearchInput: $BookSearchInput) {
      hasNext
      items {
        isbn13
        title
        author
        description
        cover
        categoryId
        categoryName
        pubDate
        publisher
        priceStandard
        customerReviewRank
      }
    }
  }
`;

export class BookQuery extends Query {
  constructor() {
    super();
  }

  queryKey = ["book"];

  getBookList = (keyword: string) =>
    this.infiniteQueryOptions({
      queryKey: [...this.queryKey, keyword],
      queryFn: ({ pageParam }: { pageParam: GetBookListQueryVariables }) =>
        this.graphql<GetBookListQuery, GetBookListQueryVariables>(GET_BOOK_LIST, pageParam),
      initialPageParam: {
        BookSearchInput: {
          keyword,
          take: 12,
          skip: 1,
        },
      },
      getNextPageParam: (lastPage: GetBookListQuery, _: any, lastPageParam: GetBookListQueryVariables) => {
        return {
          BookSearchInput: {
            keyword,
            take: 12,
            skip: lastPage.bookList?.hasNext ? lastPageParam.BookSearchInput.skip + 1 : NaN,
          },
        };
      },
    });

  getBook = (isbn13: string) =>
    this.queryOptions({
      queryKey: [...this.queryKey, isbn13, "getBook"],
      queryFn: () => this.graphql<GetBookQuery, GetBookQueryVariables>(GET_BOOK_BY_ISBN, { isbn13 }),
      enabled: !!isbn13,
    });

  getBookAllData = (isbn13: string) =>
    this.queryOptions({
      queryKey: [...this.queryKey, isbn13, "getBookAllData"],
      queryFn: () => this.graphql<GetAllBookDataQuery, GetAllBookDataQueryVariables>(GET_ALL_BOOK_DATA, { isbn13 }),
      enabled: !!isbn13,
    });
}
