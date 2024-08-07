import { GetReportList } from "@/types/report.types";

export const formatReportArray = (data: GetReportList | undefined, reportId: string) => {
  if (!data) return [];

  const items = data.items;
  const newItems = [];

  for (const item of items) {
    if (item.id !== reportId) {
      newItems.push(item);
    }
  }

  return newItems;
};
