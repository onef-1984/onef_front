import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSocket } from "./useSocket";
import type { Notification } from "@/types/notification.types";
import { NotificationQuery } from "@/apis/reactQuery/Query/NotificationQuery";

export default function useNotification(userId: string) {
  const queryClient = useQueryClient();
  const notificationQuery = new NotificationQuery();
  const { data } = useQuery(notificationQuery.getNotifications(userId));

  useSocket(userId, "notification", () => {
    queryClient.invalidateQueries({ queryKey: ["notification"], refetchType: "all" });
  });

  const { newData, isNew } = formatData(data ?? []);

  return { isNew, data: newData };
}

const formatData = (data: Array<Notification>) => {
  let isNew = false;
  const newData = data?.map((item) => {
    if (item.isRead === false) {
      isNew = true;
    }

    switch (item.type) {
      case "NEW_COMMENT_ON_REPORT":
        return {
          ...item,
          title: "새로운 댓글이 기다리고 있습니다!",
          description: "확인해보세요.",
          link: `/report/${item.report.id}`,
        };

      case "NEW_LIKE_ON_REPORT":
        return {
          ...item,
          title: "좋아요가 눌렸어요!",
          description: "확인해보세요.",
          link: `/report/${item.report.id}`,
        };

      case "NEW_REPORT_FROM_FOLLOWING":
        return {
          ...item,
          title: "팔로잉한 유저가 새로운 독후감을 올렸어요!",
          description: "지금 바로 확인해보세요.",
          link: `/report/${item.report.id}`,
        };
    }
  });

  return { newData, isNew };
};
