import { GetReportListBySearchQuery } from "@/types/graphql.types";

export const formatReportArray = (data: GetReportListBySearchQuery | undefined, reportId: string) => {
  if (!data) return [];

  const items = data?.reportList.items;
  const newItems = [];

  for (const item of items) {
    if (item.id !== reportId) {
      newItems.push(item);
    }
  }

  return newItems;
};
