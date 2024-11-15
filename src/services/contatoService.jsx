import { post } from './api';

// Função para buscar todas as conversas
export const fetchAllConversations = async () => {
    return await post('/chat/conversations')
        .then((result) => result)
        .catch((error) => {
            console.log("Error fetching all conversations:", error);
            return { data: null, error };
        });
};

// Função para buscar uma conversa específica por ID
export const fetchConversationById = async (id = null) => {
    const endpoint = `/chat/conversations/${id}`;
    return await post(endpoint)
        .then((result) => result)
        .catch((error) => {
            console.log("Error fetching conversation by ID:", error);
            return { data: null, error };
        });
};
