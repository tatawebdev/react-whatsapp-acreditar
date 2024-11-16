// Tela principal de bate-papo (onde as mensagens são exibidas)
import React from "react";
import ChatScreen from "./ChatScreen";
import ContatosScreen from "./ContatosScreen";

import { SelectedUserProvider } from "../context/contatos/SelectedUserContext";
import { FullScreenProvider } from "../context/images/FullScreenContext";
import { DownloadProvider } from "../context/images/DownloadContext";

const Chat = () => {
  return (
    <div className="bg-[#111b21] flex items-center justify-center h-screen overflow-y-hidden ">
      <div className="flex h-full w-full overflow-y-hidden scroller">
        <SelectedUserProvider>
          <DownloadProvider>
            <FullScreenProvider>
              <ContatosScreen />

              <ChatScreen />
            </FullScreenProvider>
          </DownloadProvider>
        </SelectedUserProvider>
      </div>
    </div>
  );
};

export default Chat;
