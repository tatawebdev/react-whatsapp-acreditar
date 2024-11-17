import React, { useRef, useState } from "react";
import { MdSend } from "react-icons/md";
import { sendMessageImage } from "../services/chatService";
import { useSelectedUser } from "../context/contatos/SelectedUserContext";

export default function ImageUploadButton() {
  const { conversationData, setConversationData } = useSelectedUser();

  const { selectedUser } = useSelectedUser();

  const fileInputRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null); // Armazena o arquivo selecionado

  // Função para lidar com a seleção de arquivos
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file); // Armazena o arquivo selecionado
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageSrc(e.target.result);
        setShowModal(true);
      };
      reader.readAsDataURL(file);
    }
  };

  // Função para abrir o seletor de arquivos
  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Função para fechar o modal e limpar o estado
  const handleCloseModal = () => {
    setShowModal(false);
    setImageSrc(null);
    setSelectedFile(null); // Limpa o arquivo selecionado
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Zera o valor do input de arquivo
    }
  };

  // Função para lidar com o clique no fundo do modal
  const handleBackgroundClick = (event) => {
    if (event.target === event.currentTarget) {
      handleCloseModal(); // Fecha o modal e zera o file
    }
  };

  // Função para enviar a imagem
  const handleSendImage = async () => {
    if (selectedFile) {
      try {
        const { from, contact_name } = selectedUser;

        //console.log(selectedUser, "aqui_selectedUser")

        // Chama a função sendMessageImage
        const response = await sendMessageImage(
          selectedFile,
          from,
          contact_name
        );

        console.log(response?.data)
        if (response?.data?.message)
          setConversationData((prevData) => [
            ...prevData,
            response.data.message,
          ]);

        //console.log("Imagem enviada com sucesso:", response.data);
        handleCloseModal(); // Fecha o modal após o envio
      } catch (error) {
        console.error("Erro ao enviar a imagem:", error);
      }
    }
  };
  return (
    <div>
      {/* Input de arquivo escondido */}
      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileSelect}
      />
      {/* Botão para abrir o seletor de arquivos */}
      <button
        type="button"
        className="rounded p-2 hover:bg-gray-100"
        onClick={handleClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -960 960 960"
          width="28"
          height="28"
          className="fill-current text-gray-400"
        >
          <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm40-80h480L570-480 450-320l-90-120-120 160Zm-40 80v-560 560Z"></path>
        </svg>
      </button>

      {showModal && (
        <div
          className="fixed left-0 top-0 w-full h-full bg-gray-800 bg-opacity-70 flex justify-center items-center z-50"
          onClick={handleBackgroundClick}
        >
          <div className="p-6 rounded-lg shadow-lg max-w-md w-full">
            {/* Imagem selecionada */}
            {imageSrc && (
              <img
                src={imageSrc}
                alt="Preview"
                className="mb-4 max-w-full h-auto rounded"
              />
            )}

            {/* Footer com botões */}
            <div className="absolute bottom-0 left-0 right-0 gap-5 bg-[#202c33] p-4 flex justify-end">
              {/* Botão de Cancelar */}
              <button
                className="flex items-center justify-center bg-gray-300 text-red-700 rounded px-4 py-2 hover:text-red-800"
                onClick={handleCloseModal}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 20.188l-8.178-8.188 8.178-8.188-3.812-3.812-8.188 8.178-8.188-8.178-3.812 3.812 8.178 8.188-8.178 8.188 3.812 3.812 8.188-8.178 8.188 8.178z" />
                </svg>
              </button>

              {/* Botão de Enviar */}
              <button
                type="button"
                onClick={handleSendImage}
                className="flex items-center justify-center bg-teal-700 text-white rounded px-4 py-2 hover:bg-teal-600"
              >
                <MdSend className="text-white text-2xl" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
