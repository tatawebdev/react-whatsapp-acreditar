// Tela principal de bate-papo (onde as mensagens são exibidas)
import React from "react";
import ChatScreen from "./ChatScreen";
import ContatosScreen from "./ContatosScreen";

import { SelectedUserProvider } from "../context/contatos/SelectedUserContext";

const Chat = () => {
  return (
    <div className="bg-[#111b21] flex items-center justify-center h-screen overflow-y-hidden ">
      <div className="flex h-full w-full overflow-y-hidden scroller">
        <SelectedUserProvider>

          <ContatosScreen />
          
          <ChatScreen />

        </SelectedUserProvider>
      </div>
    </div>
  );
};

export default Chat;
