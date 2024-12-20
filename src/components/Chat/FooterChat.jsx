import React, { useEffect, useRef, useState } from "react";
import { BiSend } from "react-icons/bi";
import { MdSend } from "react-icons/md";
import { useSelectedUser } from "../../context/contatos/SelectedUserContext";
import { sendMessageText } from "../../services/chatService";
import { v4 as uuidv4 } from "uuid";
import ImageUploadButton from "../ImageUploadButton";
import RecordMicrophone from "./footer/RecordMicrophone";

const VoiceIcon = () => {
  return (
    <div className="flex space-x-4 cursor-pointer">
      {/* Botão para o primeiro ícone
      <button className="rounded ">
        <svg
          viewBox="0 0 24 24"
          width="28"
          height="28"
          className="fill-current text-gray-400"
        >
          <path d="M9.153 11.603c.795 0 1.439-.879 1.439-1.962s-.644-1.962-1.439-1.962-1.439.879-1.439 1.962.644 1.962 1.439 1.962zm-3.204 1.362c-.026-.307-.131 5.218 6.063 5.551 6.066-.25 6.066-5.551 6.066-5.551-6.078 1.416-12.129 0-12.129 0zm11.363 1.108s-.669 1.959-5.051 1.959c-3.505 0-5.388-1.164-5.607-1.959 0 0 5.912 1.055 10.658 0zM11.804 1.011C5.609 1.011.978 6.033.978 12.228s4.826 10.761 11.021 10.761S23.02 18.423 23.02 12.228c.001-6.195-5.021-11.217-11.216-11.217zM12 21.354c-5.273 0-9.381-3.886-9.381-9.159s3.942-9.548 9.215-9.548 9.548 4.275 9.548 9.548c-.001 5.272-4.109 9.159-9.382 9.159zm3.108-9.751c.795 0 1.439-.879 1.439-1.962s-.644-1.962-1.439-1.962-1.439.879-1.439 1.962.644 1.962 1.439 1.962z"></path>
        </svg>
      </button>

      {/* Botão para o segundo ícone */}
      {/* <button className="rounded ">
        <svg
          viewBox="0 0 24 24"
          width="28"
          height="28"
          className="fill-current text-gray-400"
        >
          <path d="M1.816 15.556v.002c0 1.502.584 2.912 1.646 3.972s2.472 1.647 3.974 1.647a5.58 5.58 0 0 0 3.972-1.645l9.547-9.548c.769-.768 1.147-1.767 1.058-2.817-.079-.968-.548-1.927-1.319-2.698-1.594-1.592-4.068-1.711-5.517-.262l-7.916 7.915c-.881.881-.792 2.25.214 3.261.959.958 2.423 1.053 3.263.215l5.511-5.512c.28-.28.267-.722.053-.936l-.244-.244c-.191-.191-.567-.349-.957.04l-5.506 5.506c-.18.18-.635.127-.976-.214-.098-.097-.576-.613-.213-.973l7.915-7.917c.818-.817 2.267-.699 3.23.262.5.501.802 1.1.849 1.685.051.573-.156 1.111-.589 1.543l-9.547 9.549a3.97 3.97 0 0 1-2.829 1.171 3.975 3.975 0 0 1-2.83-1.173 3.973 3.973 0 0 1-1.172-2.828c0-1.071.415-2.076 1.172-2.83l7.209-7.211c.157-.157.264-.579.028-.814L11.5 4.36a.572.572 0 0 0-.834.018l-7.205 7.207a5.577 5.577 0 0 0-1.645 3.971z"></path>
        </svg>
      </button> * */}

      {/* Botão para o terceiro ícone */}
      <ImageUploadButton />
    </div>
  );
};

const MessageInput = ({ setText, text }) => {
  return (
    <input
      value={text}
      onChange={(e) => setText(e.target.value)}
      type="text"
      className="focus:outline-none bg-[#2a3942] w-full text-[#aebac1] p-3 rounded-lg text-sm"
      placeholder="Digite uma mensagem"
    />
  );
};

const BiMicrophone = ({
  buttonVoice,
  setButtonVoice,
  isRecording,
  setIsRecording,
}) => {
  const [text, setText] = useState("");

  const handleButtonVoice = () => {
    if (buttonVoice || isRecording) {
      setButtonVoice(false);
      setIsRecording(true);
    } else {
      setButtonVoice(true);
      setIsRecording(false);
    }
  };

  useEffect(() => {
    //console.log("Estado do buttonVoice mudou:", buttonVoice);
  }, [buttonVoice, isRecording]);

  return (
    <button
      onClick={handleButtonVoice}
      className="flex items-center justify-center text-white font-semibold py-2 px-4 rounded-full shadow-md"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        className="h-6 w-6"
      >
        <path
          fill={buttonVoice ? "#ff3333" : "#aebac1"}
          d="M11.999 14.942c2.001 0 3.531-1.53 3.531-3.531V4.35c0-2.001-1.53-3.531-3.531-3.531S8.469 2.35 8.469 4.35v7.061c0 2.001 1.53 3.531 3.53 3.531zm6.238-3.53c0 3.531-2.942 6.002-6.237 6.002s-6.237-2.471-6.237-6.002H3.761c0 4.001 3.178 7.297 7.061 7.885v3.884h2.354v-3.884c3.884-.588 7.061-3.884 7.061-7.885h-2z"
        ></path>
      </svg>
    </button>
  );
};

const FooterChat = () => {
  const [text, setText] = useState("");

  const { conversationData, setConversationData, selectedUser } =
    useSelectedUser();

  const [buttonVoice, setButtonVoice] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunks = useRef([]);

  useEffect(() => {
    if (isRecording) {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          mediaRecorderRef.current = new MediaRecorder(stream);
          mediaRecorderRef.current.ondataavailable = (event) => {
            audioChunks.current.push(event.data);
          };
          mediaRecorderRef.current.onstop = () => {
            const audioBlob = new Blob(audioChunks.current, {
              type: "audio/wav",
            });
            const audioUrl = URL.createObjectURL(audioBlob);

            //console.log("Áudio gravado:", audioUrl);
            audioChunks.current = [];
          };
          mediaRecorderRef.current.start();
        })
        .catch((err) => {
          console.error("Erro ao acessar o microfone:", err);
        });
    } else {
      if (
        mediaRecorderRef.current &&
        mediaRecorderRef.current.state !== "inactive"
      ) {
        mediaRecorderRef.current.stop();
      }
    }

    return () => {
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stream
          .getTracks()
          .forEach((track) => track.stop());
      }
    };
  }, [isRecording]);

  const sendMessage = async (e) => {
    e.preventDefault();
    const unique_identifier = uuidv4();

    setConversationData([
      ...conversationData,
      {
        content: text,
        sent_by_user: 0,
        status: "pending",
        timestamp: Date.now(),
        type: "message_text",
        unique_identifier,
      },
    ]);

    // Limpar o campo de entrada de texto
    setText("");

    try {
      const { from, contact_name } = selectedUser;

      const response = await sendMessageText(
        text,
        from,
        contact_name,
        unique_identifier
      );
      const status = response.error ? "failed" : "pending";
      setConversationData((prevData) =>
        prevData.map((msg) => {
          // Verificar se o ID da mensagem corresponde
          //console.log(unique_identifier)
          if (msg.unique_identifier == unique_identifier) {
            return {
              ...msg,
              sent_by_user: 0,
              status,
            };
          }
          return msg;
        })
      );
    } catch (error) {
      console.error("Erro ao enviar a mensagem:", error);
    }
  };
  const startRecordingHandler = () => {
    console.log("Gravação Iniciada");
  };

  const cancelRecordingHandler = () => {
    console.log("Gravação Cancelada");
  };

  const finishRecordingHandler = () => {
    console.log("Gravação Finalizada");
  };
  return (
    <form
      onSubmit={sendMessage}
      className="flex flex-none space-x-2 items-center bg-[#202c33] px-6 py-4"
    >
      {!buttonVoice && <VoiceIcon />}

      <div className="flex flex-grow items-center space-x-4">
        {!buttonVoice ? (
          <MessageInput text={text} setText={setText} />
        ) : (
          <div className="flex flex-grow items-center space-x-4">
            {isRecording ? <p>Gravando...</p> : <p>Pressione para gravar</p>}
          </div>
        )}
        {!text ? (
          <>
            <RecordMicrophone
              startRecording={startRecordingHandler}
              cancelRecording={cancelRecordingHandler}
              finishRecording={finishRecordingHandler}
            />
          </>
        ) : (
          <button>
            <MdSend className="text-teal-700 text-2xl" />
          </button>
        )}
      </div>
    </form>
  );
};

export default FooterChat;
