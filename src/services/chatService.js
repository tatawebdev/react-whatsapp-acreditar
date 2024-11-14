// Funções para enviar e receber mensagens 
import Api from './api';

export const getMessages = async () => {
  try {
    const messages = await Api.get('/messages');
    return messages;
  } catch (error) {
    console.log('Error fetching messages:', error);
    throw error; // Lança o erro para ser tratado no componente
  }
};

export const sendMessage = async (message) => {
  try {
    const response = await Api.post('/messages', { message });
    return response;
  } catch (error) {
    console.log('Error sending message:', error);
    throw error;
  }
};
