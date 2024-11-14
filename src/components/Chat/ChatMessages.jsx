import React from "react";
import { useSelectedUser } from "../../context/contatos/SelectedUserContext";
import MessageText from "../BaloesChat/MessageText";

const componentMap = {
  message_text: MessageText,
};

export default function ChatMessages() {
  const { conversationData } = useSelectedUser();
  // console.log(conversationData,'debug_conversation_data')
  return (
    <div className="chat-container">
      {conversationData &&
        conversationData.data.map((msg, index) => {
          const Component = componentMap[msg.type] || MessageText;
          return <Component key={index} {...msg} />;
        })}
    </div>
  );
}
