import { useState, useEffect, useRef } from "react";
import "./RecordMicrophone.css";
import { useSelectedUser } from "../../../context/contatos/SelectedUserContext";
import { sendAudioToServer } from "../../../services/chatService";

function RecordMicrophone({
  startRecording,
  cancelRecording,
  finishRecording,
}) {
  const [state, setState] = useState("idle"); // "idle", "recording", "sending"
  const [time, setTime] = useState(0); // Tempo em segundos
  const [wavAudioBlob, setwavAudioBlob] = useState(null); // Para armazenar o áudio gravado
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const audioRef = useRef(null); // Para controlar a reprodução do áudio
  const { selectedUser } = useSelectedUser();


  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  useEffect(() => {
    let timer;

    if (state === "recording") {
      if (mediaRecorder && mediaRecorder.state === "inactive") {
        mediaRecorder.start();
      }

      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      setTime(0);
      if (mediaRecorder && mediaRecorder.state === "recording") {
        mediaRecorder.stop();
      }
    }

    // Limpeza do intervalo ao desmontar ou mudar o estado
    return () => clearInterval(timer);
  }, [state, mediaRecorder]);

  const handleStartRecording = () => {
    setState("recording");
    setTime(0);
    if (startRecording) startRecording();
  
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const audioChunks = [];  // Mover o array para fora do evento ondataavailable
        const recorder = new MediaRecorder(stream);
  
        recorder.ondataavailable = (event) => {
          audioChunks.push(event.data); // Armazenar os pedaços de áudio enquanto são gravados
        };
  
        recorder.onstop = () => {
          
          const wavAudioBlob = new Blob(audioChunks, { type: "audio/wav" }); // Criar o blob após a gravação
          setwavAudioBlob(wavAudioBlob); 
        };
  
        setMediaRecorder(recorder);
        recorder.start(); // Iniciar a gravação
      })
      .catch((err) => {
        console.error("Erro ao acessar o microfone: ", err);
      });
  };
  
  const handleCancelRecording = () => {
    setState("idle");
    setTime(0);
    if (cancelRecording) cancelRecording();
    if (mediaRecorder) mediaRecorder.stop(); // Parar a gravação
  };

  const handleFinishRecording = () => {
    setState("sending"); // Passa para a etapa de envio
    if (finishRecording) finishRecording();
    if (mediaRecorder) mediaRecorder.stop(); // Finalizar a gravação
  };

  const handleSendAudio = () => {
    if (wavAudioBlob) {
      const { from, contact_name } = selectedUser;
        // const response =  await sendAudioToServer; 

      sendAudioToServer(
          wavAudioBlob,
          from,
          contact_name
        ) // Envia o áudio via AJAX
        .then(() => {
          setState("idle"); // Retorna ao estado "idle" após envio
        })
        .catch((error) => {
          console.error("Erro ao enviar áudio:", error);
          setState("idle"); // Em caso de erro, retorna ao estado "idle"
        });
    }
  };

  const handlePlayRecording = () => {
    if (wavAudioBlob) {
      const audioUrl = URL.createObjectURL(wavAudioBlob);
      audioRef.current.src = audioUrl;
      audioRef.current.play();
      audioRef.current.onended = () => setState("idle");
    }
  };

  return (
    <>
      {state === "recording" ? (
        <div className="flex items-end max-w-full relative z-10">
          <div className="flex flex-row items-center space-x-3 gap-[20px]">
            <button
              onClick={handleCancelRecording}
              aria-label="Cancel Recording"
              className="text-white flex justify-center items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 11 25"
                width="35"
                height="35"
                className="text-white"
              >
                <path
                  opacity=".6"
                  fill="#fff"
                  d="M5,0,3,2H0V4H16V2H13L11,0ZM15,5H1V19.5A2.5,2.5,0,0,0,3.5,22h9A2.5,2.5,0,0,0,15,19.5Z"
                />
              </svg>
            </button>

            <div
              id="record-microphone-timer"
              className="flex items-center text-lg font-bold text-gray-400"
            >
              <div className="circle-before"></div>
              {formatTime(time)}
            </div>

            <button
              onClick={handleFinishRecording}
              aria-label="Finish Recording"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 35 35"
                width="35"
                height="35"
                className="text-green-500"
              >
                <path
                  opacity=".8"
                  fill="#09D261"
                  d="M17.5 34.75C7.988 34.75.25 27.012.25 17.5S7.988.25 17.5.25 34.75 7.988 34.75 17.5 27.012 34.75 17.5 34.75zm0-33.5C8.54 1.25 1.25 8.54 1.25 17.5S8.54 33.75 17.5 33.75s16.25-7.29 16.25-16.25S26.46 1.25 17.5 1.25z"
                />
                <path
                  opacity=".8"
                  fill="#09D261"
                  d="M14.3 21.4l-4.2-4.2-1.4 1.4 5.6 5.6 12-12-1.4-1.4-10.6 10.6z"
                />
              </svg>
            </button>
          </div>
        </div>
      ) : state === "sending" ? (
        <div className="flex items-center">
          <span>Enviando...</span>
          {handleSendAudio()}
        </div>
      ) : state === "playing" ? (
        <div className="flex items-center">
          <button onClick={handlePlayRecording}>
            <span>Play</span>
          </button>
          <audio ref={audioRef} />
        </div>
      ) : (
        <button onClick={handleStartRecording}>
          <span aria-hidden="true" data-icon="ptt">
            <svg
              viewBox="0 0 24 24"
              height="24"
              width="24"
              preserveAspectRatio="xMidYMid meet"
            >
              <title>ptt</title>
              <path
                fill="#e5e7eb"
                d="M11.999,14.942c2.001,0,3.531-1.53,3.531-3.531V4.35c0-2.001-1.53-3.531-3.531-3.531 S8.469,2.35,8.469,4.35v7.061C8.469,13.412,9.999,14.942,11.999,14.942z M18.237,11.412c0,3.531-2.942,6.002-6.237,6.002 s-6.237-2.471-6.237-6.002H3.761c0,4.001,3.178,7.297,7.061,7.885v3.884h2.354v-3.884c3.884-0.588,7.061-3.884,7.061-7.885 L18.237,11.412z"
              />
            </svg>
          </span>
        </button>
      )}
    </>
  );
}

export default RecordMicrophone;
