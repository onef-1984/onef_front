export class BookEndPoint {
  static getBook(isbn: string) {
    return `/aladin/${isbn}`;
  }

  static getBookList(keyword: string) {
    return `/aladin/search?keyword=${keyword}&take=10`;
  }
}
