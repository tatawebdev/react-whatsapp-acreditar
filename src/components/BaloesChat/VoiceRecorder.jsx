import React, { useState } from "react";
import { VoiceRecorder } from "react-voice-recorder-player";

export default function Voice() {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const styles = {
    mainContainerStyle: {
      backgroundColor: "gray",
      border: "1px solid black",
      borderRadius: "5px",
      padding: "10px",
    },
    controllerContainerStyle: {
      display: "flex",
      justifyContent: "space-between",
      marginTop: "10px",
    },
    controllerStyle: {
      backgroundColor: "white",
      border: "1px solid black",
      borderRadius: "5px",
      cursor: "pointer",
      padding: "5px",
    },
    waveContainerStyle: {
      height: "100px",
      marginTop: "10px",
      width: "100%",
    },
  };

  // Callback para iniciar a gravação
  const handleRecordingStart = () => {
    setIsRecording(true);
    setIsPaused(false);
  };

  // Callback para terminar a gravação
  const handleRecordingEnd = () => {
    setIsRecording(false);
    setIsPaused(false);
  };

  // Callback para pausar a gravação
  const handleRecordingPause = () => {
    setIsPaused(true);
  };

  // Callback para retomar a gravação
  const handleRecordingResume = () => {
    setIsPaused(false);
  };

  return (
    <div>
      <VoiceRecorder
        mainContainerStyle={styles.mainContainerStyle}
        controllerContainerStyle={styles.controllerContainerStyle}
        controllerStyle={styles.controllerStyle}
        waveContainerStyle={styles.waveContainerStyle}
        onRecordingStart={handleRecordingStart}
        onRecordingEnd={handleRecordingEnd}
        onRecordingPause={handleRecordingPause}
        onRecordingResume={handleRecordingResume}
        isRecording={isRecording}
        isPaused={isPaused}
      />

      <button
        onClick={() => {
          if (isRecording && !isPaused) {
            handleRecordingPause();  // Pausa a gravação
          } else if (isRecording && isPaused) {
            handleRecordingResume();  // Retoma a gravação
          } else {
            handleRecordingStart();  // Inicia a gravação
          }
        }}
        style={{
          ...styles.controllerStyle,
          backgroundColor: isRecording ? (isPaused ? "yellow" : "red") : "green",
        }}
      >
        {isRecording ? (isPaused ? "Pausar" : "Gravando...") : "Iniciar Gravação"}
      </button>
    </div>
  );
}
