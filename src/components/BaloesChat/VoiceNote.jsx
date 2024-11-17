import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { getResourcebyFileID } from "../../services/chatService";
import { FaPlay, FaPause } from "react-icons/fa"; // Importando os ícones
import './VoiceNote.css'

export default function VoiceNote(props) {
  const { content, fileby_content, sent_by_user } = props; // Usando apenas `content`
  const [audioSrc, setAudioSrc] = useState(null);
  const [duration, setDuration] = useState(0); // Duração total do áudio
  const [currentTime, setCurrentTime] = useState(0); // Tempo atual de reprodução
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const progressRef = useRef(null); // Referência para o input de progresso

  // Função para alternar o estado de reprodução
  const togglePlayback = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Função para formatar o tempo (segundos) em minutos:segundos
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? "0" + secs : secs}`;
  };

  // Função para atualizar o progresso do áudio a cada segundo
  const updateProgress = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  // Carregar o áudio quando o componente for montado
  useEffect(() => {
    const loadAudio = async () => {
      try {
        const base64Audio = await getResourcebyFileID(content);
        setAudioSrc(base64Audio);
      } catch (error) {
        console.error("Erro ao carregar o áudio:", error);
      }
    };

    loadAudio();
  }, [content]);

  // Atualizar a duração do áudio quando ele for carregado
  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  // Atualizar o progresso a cada segundo usando `useEffect`
  useEffect(() => {
    if (audioRef.current) {
      const interval = setInterval(updateProgress, 1000);
      return () => clearInterval(interval);
    }
  }, [currentTime]);

  // Sincronizar o progresso com o valor do input de range
  useEffect(() => {
    if (progressRef.current) {
      progressRef.current.value = (currentTime / duration) * 100;
    }
  }, [currentTime, duration]);

  // Alterar o tempo de reprodução quando o usuário mover o controle deslizante
  const handleProgressChange = (e) => {
    if (audioRef.current) {
      const newTime = (e.target.value / 100) * duration;
      audioRef.current.currentTime = newTime;
    }
  };
  const alignmentClass = !!sent_by_user ? "justify-start" : "justify-end";

  return (
    <div className={`flex items-start gap-2.5 ${alignmentClass}`}>
      <div className="flex flex-col gap-1">
        <div className="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-[#005c4b]">
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <button
              onClick={togglePlayback}
              className="inline-flex self-center items-center p-2 text-sm font-medium text-center text-gray-900 bg-gray-100 rounded-lg hover:bg-gray-200 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-[#005c4b] dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              type="button"
            >
              {isPlaying ? (
                <FaPause className="w-4 h-4 text-gray-800 dark:text-white" />
              ) : (
                <FaPlay className="w-4 h-4 text-gray-800 dark:text-white" />
              )}{" "}
            </button>

            <input
              ref={progressRef}
              type="range"
              min="0"
              max="100"
              className="_3geJ8"
              value={duration ? (currentTime / duration) * 100 : 0}
              onChange={handleProgressChange}
            />

            <span className="inline-flex self-center items-center p-2 text-sm font-medium text-gray-900 dark:text-white">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>
        </div>
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
          Delivered
        </span>
      </div>

      {/* Adicionando o componente de áudio */}
      {audioSrc && (
        <audio
          ref={audioRef}
          src={audioSrc}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={() => setIsPlaying(false)}
        />
      )}
    </div>
  );
}

VoiceNote.propTypes = {
  content: PropTypes.string.isRequired,
};
