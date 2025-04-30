import socket from "@/apis/Base/socket";
import { useEffect } from "react";

export const useSocket = (userId: string, event: string, callback: (data: any) => void) => {
  useEffect(() => {
    socket.emit("userConnect", { userId });

    socket.on(event, callback);

    return () => {
      socket.off(event, callback);
    };
  }, [userId, event, callback]);
};
