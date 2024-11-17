// Tela principal de bate-papo (onde as mensagens são exibidas)
import React, { useEffect, useRef } from "react";
import HeaderChat from "../components/Chat/HeaderChat";
import ChatMessages from "../components/Chat/ChatMessages";
import FooterChat from "../components/Chat/FooterChat";
import { useSelectedUser } from "../context/contatos/SelectedUserContext";
import Voice from "../components/BaloesChat/VoiceRecorder";

const ChatScreen = () => {
  const { selectedUser } = useSelectedUser();
  console.log(selectedUser);
  if (!selectedUser) {
    return <div></div>;
  }

  return (
    <div className="flex flex-col bg-[#0b141a] flex-grow chat-background">
      <div className="flex justify-between bg-[#202c33] px-4 py-2">
        <HeaderChat />
      </div>

      <ChatMessages />
      {selectedUser?.isActive && <FooterChat />}
    </div>
  );
};

export default ChatScreen;
