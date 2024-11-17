import { post, postFile, get } from "./api";
import { encodeAudioBufferLame } from "./audioService";

// Função para enviar mensagens de texto
export const sendMessageText = async (
  content,
  from,
  contact_name,
  unique_identifier
) => {
  try {
    const response = await post("/chat/send", {
      content,
      from,
      contact_name,
      sent_by_user: 0,
      unique_identifier,
    });
    return response;
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};

// Função para enviar imagens
export const sendMessageImage = async (file, from, contact_name) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("from", from);
    formData.append("contact_name", contact_name);

    const response = await postFile("/chat/send/image", formData);
    return response;
  } catch (error) {
    console.error("Error sending image:", error);
    throw error;
  }
};

// Função para buscar imagens
export const getResourcebyFileID = async (file_id) => {
  try {
    const response = await get(`/resources/${file_id}`, "GET");
    return response?.data?.file_url;
  } catch (error) {
    console.error("Error fetching image:", error);
    throw error;
  }
};

// Função para enviar áudio
export const sendAudioToServer = async (wavAudioBlob, from, contact_name) => {
  try {
    const audioFile = new File([wavAudioBlob], "file.wav", { type: "audio/wav" });

    // Configura o FormData para envio
    const formData = new FormData();
    formData.append("audio", audioFile);
    formData.append("from", from);
    formData.append("contact_name", contact_name);

    // Depuração: Verifica os dados do FormData
    formData.forEach((value, key) => {
      console.log(`${key}:`, value);
    });

    const response = await postFile("/chat/send/audio", formData);
    console.log("Audio sent successfully:", response);
    return response;
  } catch (error) {
    console.error("Error sending audio:", error);
    throw error;
  }
};
