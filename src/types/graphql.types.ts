export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  DateTime: { input: any; output: any };
};

export type BookObject = {
  __typename?: "BookObject";
  author: Scalars["String"]["output"];
  categoryId: Scalars["Int"]["output"];
  categoryName: Scalars["String"]["output"];
  cover: Scalars["String"]["output"];
  customerReviewRank: Scalars["Int"]["output"];
  description: Scalars["String"]["output"];
  isbn13: Scalars["String"]["output"];
  priceStandard: Scalars["Int"]["output"];
  pubDate: Scalars["String"]["output"];
  publisher: Scalars["String"]["output"];
  subInfo: SubInfoObject;
  title: Scalars["String"]["output"];
};

export type BookSearchInput = {
  keyword: Scalars["String"]["input"];
  skip: Scalars["Float"]["input"];
  take: Scalars["Float"]["input"];
};

export type BookSearchResult = {
  __typename?: "BookSearchResult";
  hasNext: Scalars["Boolean"]["output"];
  items: Array<Item>;
};

export type ChangePasswordInput = {
  newPassword: Scalars["String"]["input"];
  oldPassword: Scalars["String"]["input"];
};

export type ChangeProfileInput = {
  bio?: InputMaybe<Scalars["String"]["input"]>;
  nickname?: InputMaybe<Scalars["String"]["input"]>;
  profileImage?: InputMaybe<Scalars["String"]["input"]>;
};

export type Count = {
  __typename?: "Count";
  userLiked: Scalars["Int"]["output"];
};

export type EditorsPick = {
  __typename?: "EditorsPick";
  createdAt: Scalars["String"]["output"];
  description: Scalars["String"]["output"];
  id: Scalars["String"]["output"];
  report: Report;
};

export type IsLiked = {
  __typename?: "IsLiked";
  isLiked: Scalars["Boolean"]["output"];
};

export type Item = {
  __typename?: "Item";
  author: Scalars["String"]["output"];
  categoryId: Scalars["Float"]["output"];
  categoryName: Scalars["String"]["output"];
  cover: Scalars["String"]["output"];
  customerReviewRank: Scalars["Float"]["output"];
  description: Scalars["String"]["output"];
  isbn13: Scalars["String"]["output"];
  priceStandard: Scalars["Float"]["output"];
  pubDate: Scalars["String"]["output"];
  publisher: Scalars["String"]["output"];
  title: Scalars["String"]["output"];
};

export type Message = {
  __typename?: "Message";
  message: Scalars["String"]["output"];
};

export type Mutation = {
  __typename?: "Mutation";
  changePassword: Message;
  changeProfile: Message;
  createBook: BookObject;
  createEditorsPick: Message;
  createReport: Report;
  deleteReport: Report;
  promotionUser: Message;
  toggleReportLike: Message;
  updateReport: Report;
};

export type MutationChangePasswordArgs = {
  changePasswordDto: ChangePasswordInput;
};

export type MutationChangeProfileArgs = {
  changeProfileInput: ChangeProfileInput;
};

export type MutationCreateBookArgs = {
  isbn13: Scalars["String"]["input"];
};

export type MutationCreateEditorsPickArgs = {
  description: Scalars["String"]["input"];
  reportId: Scalars["String"]["input"];
};

export type MutationCreateReportArgs = {
  reportInput: ReportInput;
};

export type MutationDeleteReportArgs = {
  reportId: Scalars["String"]["input"];
};

export type MutationPromotionUserArgs = {
  key: Scalars["String"]["input"];
};

export type MutationToggleReportLikeArgs = {
  reportId: Scalars["String"]["input"];
};

export type MutationUpdateReportArgs = {
  reportId: Scalars["String"]["input"];
  reportUpdateInput: ReportUpdateInput;
};

/** The order by of the report */
export enum OrderBy {
  CreatedAt = "createdAt",
  UserLiked = "userLiked",
}

export type Query = {
  __typename?: "Query";
  checkUserLikedReport: IsLiked;
  getBook: BookObject;
  getBookList: BookSearchResult;
  getEditorsPick: EditorsPick;
  getMe: User;
  getMostLikedReportList: ReportList;
  getReport: Report;
  getReportListBySearch: ReportListWithHasNext;
  getUser: User;
};

export type QueryCheckUserLikedReportArgs = {
  reportId: Scalars["String"]["input"];
};

export type QueryGetBookArgs = {
  isbn13: Scalars["String"]["input"];
};

export type QueryGetBookListArgs = {
  bookSearchInput: BookSearchInput;
};

export type QueryGetReportArgs = {
  reportId: Scalars["String"]["input"];
};

export type QueryGetReportListBySearchArgs = {
  query: SearchReportInput;
};

export type QueryGetUserArgs = {
  userNickname: Scalars["String"]["input"];
};

export type Report = {
  __typename?: "Report";
  _count: Count;
  book: BookObject;
  content: Scalars["String"]["output"];
  createdAt: Scalars["DateTime"]["output"];
  id: Scalars["String"]["output"];
  tags?: Maybe<Array<Scalars["String"]["output"]>>;
  title: Scalars["String"]["output"];
  updatedAt: Scalars["DateTime"]["output"];
  user: User;
};

export type ReportInput = {
  content: Scalars["String"]["input"];
  isbn13: Scalars["String"]["input"];
  tags: Array<Scalars["String"]["input"]>;
  title: Scalars["String"]["input"];
};

export type ReportList = {
  __typename?: "ReportList";
  items: Array<Report>;
};

export type ReportListWithHasNext = {
  __typename?: "ReportListWithHasNext";
  hasNext: Scalars["Boolean"]["output"];
  items: Array<Report>;
};

export type ReportUpdateInput = {
  content?: InputMaybe<Scalars["String"]["input"]>;
  tags?: InputMaybe<Array<Scalars["String"]["input"]>>;
  title?: InputMaybe<Scalars["String"]["input"]>;
};

export type SearchReportInput = {
  keyword: Scalars["String"]["input"];
  orderBy: OrderBy;
  searchType: SearchType;
  skip: Scalars["Int"]["input"];
  take: Scalars["Int"]["input"];
};

/** The search type of the report */
export enum SearchType {
  Book = "book",
  Report = "report",
  Tag = "tag",
  User = "user",
  UserLiked = "userLiked",
}

export type SubInfoInput = {
  itemPage: Scalars["Float"]["input"];
  originalTitle: Scalars["String"]["input"];
  sizeDepth: Scalars["Float"]["input"];
  sizeHeight: Scalars["Float"]["input"];
  sizeWidth: Scalars["Float"]["input"];
  subTitle: Scalars["String"]["input"];
  weight: Scalars["Float"]["input"];
};

export type SubInfoObject = {
  __typename?: "SubInfoObject";
  itemPage: Scalars["Float"]["output"];
  originalTitle: Scalars["String"]["output"];
  sizeDepth: Scalars["Float"]["output"];
  sizeHeight: Scalars["Float"]["output"];
  sizeWidth: Scalars["Float"]["output"];
  subTitle: Scalars["String"]["output"];
  weight: Scalars["Float"]["output"];
};

export type User = {
  __typename?: "User";
  bio?: Maybe<Scalars["String"]["output"]>;
  email: Scalars["String"]["output"];
  id: Scalars["String"]["output"];
  nickname: Scalars["String"]["output"];
  profileImage?: Maybe<Scalars["String"]["output"]>;
  role: UserRole;
};

/** The roles of the user */
export enum UserRole {
  Admin = "ADMIN",
  User = "USER",
}

export type AllBookFragment = {
  __typename?: "BookObject";
  isbn13: string;
  title: string;
  author: string;
  description: string;
  cover: string;
  categoryId: number;
  categoryName: string;
  pubDate: string;
  publisher: string;
  priceStandard: number;
  customerReviewRank: number;
};

export type AllBookSubInfoFragment = {
  __typename?: "SubInfoObject";
  itemPage: number;
  subTitle: string;
  originalTitle: string;
  weight: number;
  sizeDepth: number;
  sizeHeight: number;
  sizeWidth: number;
};

export type GetBookQueryVariables = Exact<{
  isbn13: Scalars["String"]["input"];
}>;

export type GetBookQuery = {
  __typename?: "Query";
  book: {
    __typename?: "BookObject";
    isbn13: string;
    title: string;
    author: string;
    description: string;
    cover: string;
    categoryId: number;
    categoryName: string;
    pubDate: string;
    publisher: string;
    priceStandard: number;
    customerReviewRank: number;
    subInfo: { __typename?: "SubInfoObject"; itemPage: number };
  };
};

export type GetAllBookDataQueryVariables = Exact<{
  isbn13: Scalars["String"]["input"];
}>;

export type GetAllBookDataQuery = {
  __typename?: "Query";
  book: {
    __typename?: "BookObject";
    isbn13: string;
    title: string;
    author: string;
    description: string;
    cover: string;
    categoryId: number;
    categoryName: string;
    pubDate: string;
    publisher: string;
    priceStandard: number;
    customerReviewRank: number;
    subInfo: {
      __typename?: "SubInfoObject";
      itemPage: number;
      subTitle: string;
      originalTitle: string;
      weight: number;
      sizeDepth: number;
      sizeHeight: number;
      sizeWidth: number;
    };
  };
};

export type GetBookListQueryVariables = Exact<{
  BookSearchInput: BookSearchInput;
}>;

export type GetBookListQuery = {
  __typename?: "Query";
  bookList: {
    __typename?: "BookSearchResult";
    hasNext: boolean;
    items: Array<{
      __typename?: "Item";
      isbn13: string;
      title: string;
      author: string;
      description: string;
      cover: string;
      categoryId: number;
      categoryName: string;
      pubDate: string;
      publisher: string;
      priceStandard: number;
      customerReviewRank: number;
    }>;
  };
};

export type GetEditorsPickQueryVariables = Exact<{ [key: string]: never }>;

export type GetEditorsPickQuery = {
  __typename?: "Query";
  getEditorsPick: {
    __typename?: "EditorsPick";
    id: string;
    description: string;
    report: {
      __typename?: "Report";
      id: string;
      title: string;
      book: { __typename?: "BookObject"; cover: string };
      user: { __typename?: "User"; nickname: string };
    };
  };
};

export type CreateEditorsPickMutationVariables = Exact<{
  reportId: Scalars["String"]["input"];
  description: Scalars["String"]["input"];
}>;

export type CreateEditorsPickMutation = {
  __typename?: "Mutation";
  createEditorsPick: { __typename?: "Message"; message: string };
};

export type AllReportFragment = {
  __typename?: "Report";
  id: string;
  title: string;
  content: string;
  tags?: Array<string> | null;
  createdAt: any;
  updatedAt: any;
};

export type GetReportQueryVariables = Exact<{
  reportId: Scalars["String"]["input"];
}>;

export type GetReportQuery = {
  __typename?: "Query";
  report: {
    __typename?: "Report";
    id: string;
    title: string;
    content: string;
    tags?: Array<string> | null;
    createdAt: any;
    updatedAt: any;
    user: { __typename?: "User"; id: string; nickname: string };
    _count: { __typename?: "Count"; userLiked: number };
    book: {
      __typename?: "BookObject";
      isbn13: string;
      title: string;
      author: string;
      description: string;
      cover: string;
      categoryId: number;
      categoryName: string;
      pubDate: string;
      publisher: string;
      priceStandard: number;
      customerReviewRank: number;
      subInfo: { __typename?: "SubInfoObject"; itemPage: number };
    };
  };
};

export type CreateReportMutationVariables = Exact<{
  isbn13: Scalars["String"]["input"];
  ReportInput: ReportInput;
}>;

export type CreateReportMutation = {
  __typename?: "Mutation";
  book: { __typename?: "BookObject"; isbn13: string };
  report: { __typename?: "Report"; id: string };
};

export type UpdateReportMutationVariables = Exact<{
  ReportUpdateInput: ReportUpdateInput;
  ReportId: Scalars["String"]["input"];
}>;

export type UpdateReportMutation = { __typename?: "Mutation"; report: { __typename?: "Report"; id: string } };

export type DeleteReportMutationVariables = Exact<{
  ReportId: Scalars["String"]["input"];
}>;

export type DeleteReportMutation = { __typename?: "Mutation"; report: { __typename?: "Report"; id: string } };

export type ToggleReportLikeMutationVariables = Exact<{
  ReportId: Scalars["String"]["input"];
}>;

export type ToggleReportLikeMutation = {
  __typename?: "Mutation";
  message: { __typename?: "Message"; message: string };
};

export type CheckUserLikedReportQueryVariables = Exact<{
  ReportId: Scalars["String"]["input"];
}>;

export type CheckUserLikedReportQuery = { __typename?: "Query"; isLiked: { __typename?: "IsLiked"; isLiked: boolean } };

export type GetReportListBySearchQueryVariables = Exact<{
  SearchReportInput: SearchReportInput;
}>;

export type GetReportListBySearchQuery = {
  __typename?: "Query";
  reportList: {
    __typename?: "ReportListWithHasNext";
    hasNext: boolean;
    items: Array<{
      __typename?: "Report";
      id: string;
      title: string;
      content: string;
      tags?: Array<string> | null;
      createdAt: any;
      updatedAt: any;
      user: { __typename?: "User"; id: string; nickname: string };
      _count: { __typename?: "Count"; userLiked: number };
      book: { __typename?: "BookObject"; cover: string; title: string };
    }>;
  };
};

export type GetMostLikedReportListQueryVariables = Exact<{ [key: string]: never }>;

export type GetMostLikedReportListQuery = {
  __typename?: "Query";
  items: {
    __typename?: "ReportList";
    items: Array<{
      __typename?: "Report";
      id: string;
      title: string;
      content: string;
      tags?: Array<string> | null;
      createdAt: any;
      updatedAt: any;
      user: { __typename?: "User"; id: string; nickname: string };
      _count: { __typename?: "Count"; userLiked: number };
      book: { __typename?: "BookObject"; cover: string; title: string };
    }>;
  };
};

export type UserFragmentFragment = {
  __typename?: "User";
  id: string;
  email: string;
  nickname: string;
  role: UserRole;
  profileImage?: string | null;
  bio?: string | null;
};

export type GetMeQueryVariables = Exact<{ [key: string]: never }>;

export type GetMeQuery = {
  __typename?: "Query";
  user: {
    __typename?: "User";
    id: string;
    email: string;
    nickname: string;
    role: UserRole;
    profileImage?: string | null;
    bio?: string | null;
  };
};

export type GetUserQueryVariables = Exact<{
  userNickname: Scalars["String"]["input"];
}>;

export type GetUserQuery = {
  __typename?: "Query";
  user: {
    __typename?: "User";
    id: string;
    email: string;
    nickname: string;
    role: UserRole;
    profileImage?: string | null;
    bio?: string | null;
  };
};

export type ChangeProfileMutationVariables = Exact<{
  changeProfileInput: ChangeProfileInput;
}>;

export type ChangeProfileMutation = {
  __typename?: "Mutation";
  changeProfile: { __typename?: "Message"; message: string };
};

export type ChangePasswordMutationVariables = Exact<{
  changePasswordDto: ChangePasswordInput;
}>;

export type ChangePasswordMutation = {
  __typename?: "Mutation";
  changePassword: { __typename?: "Message"; message: string };
};
