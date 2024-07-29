export const formatAuthor = (author: string | undefined) => {
  if (author) return author.split(" (")[0];
  else return "";
};
