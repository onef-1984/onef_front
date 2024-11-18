import { gql } from "graphql-request";
import { QueryFn } from "../reactQuery/Query/QueryFn";
import {
  GetAllBookDataQuery,
  GetAllBookDataQueryVariables,
  GetBookListQuery,
  GetBookListQueryVariables,
  GetBookQuery,
  GetBookQueryVariables,
} from "@/types/graphql.types";
import { GraphQL } from "@/apis/grahpqlClient";

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

export class BookRequest extends GraphQL {
  constructor() {
    super();
  }

  queryKey = ["book"];

  getBookList(keyword: string) {
    return {
      queryKey: [...this.queryKey, keyword],
      queryFn: ({ pageParam }: { pageParam: GetBookListQueryVariables }) =>
        this.infiniteGraphql<GetBookListQuery, GetBookListQueryVariables>(GET_BOOK_LIST, pageParam),
      initialPageParam: {
        BookSearchInput: {
          keyword,
          take: 12,
          skip: 1,
        },
      },
      getNextPageParam: (lastPage: GetBookListQuery, allPages: any, lastPageParam: GetBookListQueryVariables) => {
        return {
          BookSearchInput: {
            keyword,
            take: 12,
            skip: lastPage.bookList?.hasNext ? lastPageParam.BookSearchInput.skip + 1 : NaN,
          },
        };
      },
    };
  }

  getBook(isbn13: string) {
    return {
      queryKey: [...this.queryKey, isbn13, "getBook"],
      queryFn: () =>
        this.graphql<GetBookQuery, GetBookQueryVariables>(GET_BOOK_BY_ISBN, {
          variables: { isbn13 },
        }),
      enabled: !!isbn13,
    };
  }

  getBookAllData(isbn13: string) {
    return {
      queryKey: [...this.queryKey, isbn13, "getBookAllData"],
      queryFn: () =>
        this.graphql<GetAllBookDataQuery, GetAllBookDataQueryVariables>(GET_ALL_BOOK_DATA, {
          variables: { isbn13 },
        }),
      enabled: !!isbn13,
    };
  }
}
