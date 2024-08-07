export const headerContent = (book: {
  title: string;
  author: string;
  publisher: string;
  categoryName: string;
  pubDate: string;
}) => {
  return {
    title: book.title,
    subTitle: `저자 : ${book.author}`,
    line1: `출판사 : ${book.publisher}`,
    line2: `카테고리 : ${book.categoryName}`,
    line3: `출간일 : ${book.pubDate}`,
  };
};
