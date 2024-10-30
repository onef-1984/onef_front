import socket from "@/apis/socket";
import { useEffect } from "react";

export const useSocket = (userId: string, event: string, callback: (data: any) => void) => {
  useEffect(() => {
    socket.emit("userConnect", { userId });

    socket.on("notification", callback);

    return () => {
      socket.off("notification", callback);
    };
  }, [userId, callback]);
};
