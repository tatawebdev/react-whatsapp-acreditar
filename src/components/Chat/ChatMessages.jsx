import React, { useState, useEffect, useRef } from "react";
import { useSelectedUser } from "../../context/contatos/SelectedUserContext";
import MessageText from "../BaloesChat/MessageText";
import { messaging } from "../../services/firebaseConfig";
import { onMessage } from "firebase/messaging";
import ImageAttachment from "../BaloesChat/ImageAttachment-cache";

const componentMap = {
  message_text: MessageText,
  image: ImageAttachment,
};

export default function ChatMessages() {
  const { conversationData, setConversationData } = useSelectedUser();
  const chatContainerRef = useRef(null);

  // Efeito para rolar automaticamente para o final ao receber novas mensagens
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
    //console.log(chatContainerRef.current.scrollHeight, 'conversationData_ok')
  }, [conversationData]);

  // Efeito para escutar mensagens em tempo real do Firebase
  useEffect(() => {
    const unsubscribe = onMessage(messaging, (payload) => {
      //console.log("Mensagem recebida em primeiro plano:", payload);

      // Extrair os dados da mensagem
      const newMessage = payload.data;
      //console.log(newMessage, "newMessage");

      if (newMessage.type === "status") {
        setConversationData((prevData) =>
          prevData.map((msg) => {
            //console.log(newMessage?.unique_identifier);
            if (
              newMessage?.unique_identifier &&
              msg.unique_identifier == newMessage.unique_identifier
            ) {
              //console.log("Atualizando status da mensagem:", msg);
              return {
                ...msg,
                sent_by_user: 0,
                status: newMessage.status,
              };
            }
            return msg;
          })
        );
      } else {
        newMessage.sent_by_user = 1;

        console.log(newMessage, "content_content_newMessage")
        setConversationData((prevData) => [...prevData, newMessage]);
      }
    });

    // return () => unsubscribe();
  }, [conversationData]);

  return (
    <div
      ref={chatContainerRef}
      className="flex flex-col space-y-4 w-full py-4 px-10 xl:px-24 bg-black-rgba scroller overflow-x-hidden overflow-y-auto flex-grow fundo"
    >
      <div className="chat-container">
        {conversationData &&
          conversationData.map((msg, index) => {
              const Component = componentMap[msg.type] || MessageText;
            return (
              <>
                <Component key={msg.unique_identifier || msg.message_id} {...msg} />
                {/* {msg.content} */}
              </>
            );
          })}
      </div>
    </div>
  );
}
