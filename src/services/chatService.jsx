// Funções para enviar e receber mensagens
import { post, postImage, get } from "./api";

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
    console.log("Error sending message:", error);
    throw error;
  }
};

export const sendMessageImage = async (file, from, contact_name) => {
  try {
    // Cria um FormData para enviar a imagem
    const formData = new FormData();
    formData.append("file", file);
    formData.append("from", from);
    formData.append("contact_name", contact_name);

    // Faz a requisição para enviar a imagem
    const response = await postImage("/chat/send/image", formData);
    return response;
  } catch (error) {
    console.log("Error sending image:", error);
    throw error;
  }
};

export const getImage = async (file_id) => {
  try {
    const response = await get(`/resources/${file_id}`, "GET");
    return response?.data?.file_url;
  } catch (error) {
    console.error("Error fetching image:", error);
    throw error;
  }
};
