import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";

import notifySound from "../../public/sounds/notificationSound.mp3";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages } = useConversation();

  useEffect(() => {
    socket?.on("newMessgae", (newMessgae) => {
      newMessgae.shouldShake = true;
      const sound = new Audio(notifySound);
      sound.play();
      setMessages([...messages, newMessgae]);
    });

    return () => socket?.off("newMessgae");
  }, [socket, setMessages, messages]);
};

export default useListenMessages;
