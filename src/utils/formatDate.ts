export const formatDate = (date: string | undefined) => {
  if (typeof date === "undefined") return "";
  else {
    const utcDate = new Date("2024-07-28T09:17:51.619Z");
    const formattedDate = new Date(utcDate.getTime() + 9 * 60 * 60 * 1000);

    // 연, 월, 일 추출
    const year = formattedDate.getFullYear();
    const month = String(formattedDate.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1 필요
    const day = String(formattedDate.getDate()).padStart(2, "0");

    return `${year}.${month}.${day}`;
  }
};
