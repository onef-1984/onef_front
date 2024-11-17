export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type BookInput = {
  author: Scalars['String']['input'];
  categoryId: Scalars['Float']['input'];
  categoryName: Scalars['String']['input'];
  cover: Scalars['String']['input'];
  customerReviewRank: Scalars['Float']['input'];
  description: Scalars['String']['input'];
  isbn13: Scalars['String']['input'];
  priceStandard: Scalars['Float']['input'];
  pubDate: Scalars['String']['input'];
  publisher: Scalars['String']['input'];
  subInfo: SubInfoInput;
  title: Scalars['String']['input'];
};

export type BookObject = {
  __typename?: 'BookObject';
  author: Scalars['String']['output'];
  categoryId: Scalars['Float']['output'];
  categoryName: Scalars['String']['output'];
  cover: Scalars['String']['output'];
  customerReviewRank: Scalars['Float']['output'];
  description: Scalars['String']['output'];
  isbn13: Scalars['String']['output'];
  priceStandard: Scalars['Float']['output'];
  pubDate: Scalars['String']['output'];
  publisher: Scalars['String']['output'];
  subInfo: SubInfoObject;
  title: Scalars['String']['output'];
};

export type BookSearchInput = {
  keyword: Scalars['String']['input'];
  skip: Scalars['Float']['input'];
  take: Scalars['Float']['input'];
};

export type BookSearchResult = {
  __typename?: 'BookSearchResult';
  hasNext: Scalars['Boolean']['output'];
  items: Array<Item>;
};

export type Count = {
  __typename?: 'Count';
  userLiked: Scalars['Int']['output'];
};

export type Item = {
  __typename?: 'Item';
  author: Scalars['String']['output'];
  categoryId: Scalars['Float']['output'];
  categoryName: Scalars['String']['output'];
  cover: Scalars['String']['output'];
  customerReviewRank: Scalars['Float']['output'];
  description: Scalars['String']['output'];
  isbn13: Scalars['String']['output'];
  priceStandard: Scalars['Float']['output'];
  pubDate: Scalars['String']['output'];
  publisher: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createBook: BookObject;
  createReport: ReportList;
};


export type MutationCreateBookArgs = {
  bookInput: BookInput;
};


export type MutationCreateReportArgs = {
  reportInput: ReportInput;
};

export type Query = {
  __typename?: 'Query';
  getBook: BookObject;
  getBookList: BookSearchResult;
};


export type QueryGetBookArgs = {
  isbn13: Scalars['String']['input'];
};


export type QueryGetBookListArgs = {
  bookSearchInput: BookSearchInput;
};

export type ReportInput = {
  content: Scalars['String']['input'];
  isbn13: Scalars['String']['input'];
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
  title: Scalars['String']['input'];
};

export type ReportList = {
  __typename?: 'ReportList';
  book: BookObject;
  content: Scalars['String']['output'];
  count: Count;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type SubInfoInput = {
  itemPage: Scalars['Float']['input'];
  originalTitle: Scalars['String']['input'];
  sizeDepth: Scalars['Float']['input'];
  sizeHeight: Scalars['Float']['input'];
  sizeWidth: Scalars['Float']['input'];
  subTitle: Scalars['String']['input'];
  weight: Scalars['Float']['input'];
};

export type SubInfoObject = {
  __typename?: 'SubInfoObject';
  itemPage: Scalars['Float']['output'];
  originalTitle: Scalars['String']['output'];
  sizeDepth: Scalars['Float']['output'];
  sizeHeight: Scalars['Float']['output'];
  sizeWidth: Scalars['Float']['output'];
  subTitle: Scalars['String']['output'];
  weight: Scalars['Float']['output'];
};

export type AllBookFragment = { __typename?: 'BookObject', isbn13: string, title: string, author: string, description: string, cover: string, categoryId: number, categoryName: string, pubDate: string, publisher: string, priceStandard: number, customerReviewRank: number };

export type AllBookSubInfoFragment = { __typename?: 'SubInfoObject', itemPage: number, subTitle: string, originalTitle: string, weight: number, sizeDepth: number, sizeHeight: number, sizeWidth: number };

export type GetBookQueryVariables = Exact<{
  isbn13: Scalars['String']['input'];
}>;


export type GetBookQuery = { __typename?: 'Query', book: { __typename?: 'BookObject', isbn13: string, title: string, author: string, description: string, cover: string, categoryId: number, categoryName: string, pubDate: string, publisher: string, priceStandard: number, customerReviewRank: number, subInfo: { __typename?: 'SubInfoObject', itemPage: number } } };

export type GetAllBookDataQueryVariables = Exact<{
  isbn13: Scalars['String']['input'];
}>;


export type GetAllBookDataQuery = { __typename?: 'Query', book: { __typename?: 'BookObject', isbn13: string, title: string, author: string, description: string, cover: string, categoryId: number, categoryName: string, pubDate: string, publisher: string, priceStandard: number, customerReviewRank: number, subInfo: { __typename?: 'SubInfoObject', itemPage: number, subTitle: string, originalTitle: string, weight: number, sizeDepth: number, sizeHeight: number, sizeWidth: number } } };

export type GetBookListQueryVariables = Exact<{
  BookSearchInput: BookSearchInput;
}>;


export type GetBookListQuery = { __typename?: 'Query', bookList: { __typename?: 'BookSearchResult', hasNext: boolean, items: Array<{ __typename?: 'Item', isbn13: string, title: string, author: string, description: string, cover: string, categoryId: number, categoryName: string, pubDate: string, publisher: string, priceStandard: number, customerReviewRank: number }> } };

export type CreateReportMutationVariables = Exact<{
  BookInput: BookInput;
  ReportInput: ReportInput;
}>;


export type CreateReportMutation = { __typename?: 'Mutation', book: { __typename?: 'BookObject', isbn13: string }, report: { __typename?: 'ReportList', id: string } };
