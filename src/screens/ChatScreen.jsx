// Tela principal de bate-papo (onde as mensagens são exibidas)
import React, { useEffect, useRef } from "react";
import HeaderChat from "../components/Chat/HeaderChat";
import ChatMessages from "../components/Chat/ChatMessages";
import FooterChat from "../components/Chat/FooterChat";
import { useSelectedUser } from "../context/contatos/SelectedUserContext";
import Voice from "../components/BaloesChat/VoiceRecorder";



const ChatScreen = () => {
  const { selectedUser } = useSelectedUser();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedUser]); 


  if (!selectedUser) {
    return <div></div>;
  }
 

  return (
    <div className="flex flex-col bg-[#0b141a] flex-grow chat-background">
      <div className="flex justify-between bg-[#202c33] px-4 py-2">
        <HeaderChat />
      </div>

      <div ref={messagesEndRef} className="flex flex-col space-y-4 w-full py-4 px-10 xl:px-24 bg-black-rgba scroller overflow-x-hidden overflow-y-auto flex-grow fundo">
        <ChatMessages />
      </div>

      <FooterChat />
    </div>
  );
};

export default ChatScreen;
