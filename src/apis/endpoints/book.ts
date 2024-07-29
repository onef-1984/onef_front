export class BookEndPoint {
  static getBook(isbn: string) {
    return `/aladin/detail?isbn=${isbn}`;
  }

  static getBookList(keyword: string) {
    return `/aladin/search?keyword=${keyword}&take=10`;
  }
}
