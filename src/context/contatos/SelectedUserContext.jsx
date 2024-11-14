import React, { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { fetchConversationById } from "../../services/contatoService";

const SelectedUserContext = createContext();

export const SelectedUserProvider = ({ children }) => {
  const [selectedUser, setSelectedUser] = useState(null); // Armazena o usuário selecionado
  const [conversationData, setConversationData] = useState(null); // Dados da conversa
  const [lastFetchTime, setLastFetchTime] = useState(null); // Tempo da última requisição
  const [lastUserId, setLastUserId] = useState(null); // Armazena o último ID do usuário

  useEffect(() => {
    const canFetchAgain =
      lastFetchTime && new Date() - new Date(lastFetchTime) > 60000; // 60000ms = 1 minuto

    if (selectedUser) {
      // Se o ID do usuário for diferente ou já passou 1 minuto, faça a requisição
      if (selectedUser.id !== lastUserId || canFetchAgain) {
        console.log(conversationData, "aqui");

        const fetchUserConversations = async () => {
          try {
            const response = await fetchConversationById(selectedUser.id);
            if (response.data) {
              setConversationData(response.data); // Atualiza os dados da conversa
              setLastFetchTime(new Date()); // Atualiza o tempo da última requisição
              setLastUserId(selectedUser.id); // Atualiza o último ID do usuário
            } else {
              console.log("Nenhuma conversa encontrada.");
            }
          } catch (error) {
            console.log("Erro ao buscar conversas do usuário:", error);
          }
        };

        fetchUserConversations();
      } else {
        console.log(
          "Dados ainda válidos. Não é necessário fazer nova requisição."
        );
      }
    }
  }, [selectedUser, lastUserId, lastFetchTime, conversationData]); // Dependências de selectedUser, lastUserId e lastFetchTime

  return (
    <SelectedUserContext.Provider
      value={{ selectedUser, setSelectedUser, conversationData }}
    >
      {children}
    </SelectedUserContext.Provider>
  );
};

SelectedUserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useSelectedUser = () => {
  return useContext(SelectedUserContext);
};
