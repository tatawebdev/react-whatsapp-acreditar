import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { getResourcebyFileID } from "../../services/chatService";

export default function VoiceNote(props) {
  const { content, fileby_content, sent_by_user } = props;
  const [audioSrc, setAudioSrc] = useState(null); 

  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

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

  useEffect(() => {
    const loadAudio = async () => {
      try {
        const base64Audio = await getResourcebyFileID(content);
        setAudioSrc(base64Audio);
      } catch (error) {
        console.error("Erro ao carregar a Audiom:", error);
      }
    };

    loadAudio();
  }, []);

  const handleFullScreen = () => setIsFullScreen(true);
  const handleCloseFullScreen = () => setIsFullScreen(false);
  const alignmentClass = !!sent_by_user ? "justify-start" : "justify-end";

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={togglePlayback}
        className="p-2 bg-blue-500 text-white rounded-full"
        aria-label={isPlaying ? "Pause" : "Play"}
      >
        {isPlaying ? "Pause" : "Play"}
      </button>
      <audio
        ref={audioRef}
        controls
        src={audioSrc}
        onEnded={() => setIsPlaying(false)}
      />
      {/* {timestamp && (
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
          {timestamp}
        </span>
      )} */}
    </div>
  );
}

VoiceNote.propTypes = {
  audioSrc: PropTypes.string.isRequired,
  timestamp: PropTypes.string,
};
