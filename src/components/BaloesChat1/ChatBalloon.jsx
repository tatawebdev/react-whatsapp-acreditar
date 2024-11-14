import React from "react";
import PropTypes from "prop-types";

import {
  SentStatus,
  DeliveredStatus,
  ReadStatus,
  PendingStatus,
  AudioDownloadIcon,
  PlayButton,
  VideoIcon,
} from "./StatusMessage";
// import ReactAudioPlayer from "react-audio-player";
// import AudioPlayer from "./AudioPlayer";

export default function ChatBalloon({
  direction,
  userName,
  time,
  status,
  children,
  profileImage,
}) {
  // Definir classes com base na direção da mensagem
  const bubbleClass =
    direction === "sent"
      ? "bg-blue-500 text-white rounded-l-xl"
      : "bg-gray-300 text-gray-900 rounded-r-xl";
  const alignmentClass = direction === "sent" ? "justify-end" : "justify-start";

  return (
    <div className={`flex items-start gap-2.5 ${alignmentClass}`}>
      {/* Imagem do usuário apenas para mensagens recebidas */}
      {direction === "received" && profileImage && (
        <img
          className="w-8 h-8 rounded-full"
          src={profileImage}
          alt={`${userName} profile`}
        />
      )}

      {/* Contêiner da mensagem */}
      <div className="flex flex-col gap-1 max-w-[320px]">
        {/* Cabeçalho com nome do usuário e hora */}
        <div className="flex items-center space-x-2">
          <span className="text-sm font-semibold">{userName}</span>
          <span className="text-sm text-gray-500">{time}</span>
        </div>

        {/* Conteúdo da mensagem */}
        <div className={`p-3 ${bubbleClass}`}>{children}</div>

        {/* Status da mensagem (entregue, lida, etc.), apenas para mensagens enviadas */}
        {direction === "sent" && (
          <span className="text-xs text-gray-500">
            <SentStatus />
            <DeliveredStatus />
            <ReadStatus />
            <PendingStatus />
            <AudioDownloadIcon />
            <PlayButton />
            <VideoIcon />
            <ReactAudioPlayer
              src="/teste.mp3" // Link do arquivo de áudio
              controls
            />
            {/* <AudioPlayer audioUrl="/teste.mp3" /> */}
          </span>
        )}
      </div>
    </div>
  );
}

// Definindo as propTypes para garantir a validade das props
ChatBalloon.propTypes = {
  direction: PropTypes.oneOf(["sent", "received"]).isRequired,
  userName: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  status: PropTypes.string,
  children: PropTypes.node.isRequired,
  profileImage: PropTypes.string,
};
