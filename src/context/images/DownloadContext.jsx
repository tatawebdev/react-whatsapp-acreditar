import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
import { getImage } from "../../services/chatService";

const DownloadContext = createContext();

export const useDownloadContext = () => {
  return useContext(DownloadContext);
};

export const DownloadProvider = ({ children }) => {
  const [filesToDownload, setFilesToDownload] = useState([]);
  const [loadingFile, setLoadingFile] = useState(false); // Controle do carregamento
  const isDownloading = useRef(false); // Controle de download com useRef

  // Função para adicionar arquivos à fila de download
  const addFileToDownloadQueue = (fileID) => {
    setFilesToDownload((prevFiles) => [
      ...prevFiles,
      { fileID, loading: true },
    ]);
  };

  // Função para remover arquivo da fila após o download
  const removeFileFromQueue = () => {
    setFilesToDownload((prevFiles) => prevFiles.slice(1)); // Remove o primeiro arquivo da fila
  };

  // Função que lida com o download sequencial
  const handleDownloadQueue = async () => {
    if (filesToDownload.length > 0 && !loadingFile && !isDownloading.current) {
      isDownloading.current = true; // Marca o início do download

      const nextFile = filesToDownload[0];
      setLoadingFile(true); // Ativa o estado de carregamento

      try {
        const response = await getImage(nextFile.fileID);
        // Atualiza o estado de download com a URL da imagem
        if (response?.data?.file_url) {

            // Atualiza a fila de arquivos com o novo status
          setFilesToDownload((prevFiles) => 
            prevFiles.map((file, index) => 
              index === 0 ? { ...file, fileUrl: response.data.file_url } : file
            )
          );
        }
      } catch (error) {
        console.error("Erro ao obter imagem:", error);
      } finally {
        // removeFileFromQueue(); // Remove o arquivo da fila
        setLoadingFile(false); // Desativa o estado de carregamento
        isDownloading.current = false; // Marca o fim do download
      }
    }
  };

  useEffect(() => {
    handleDownloadQueue(); // Inicia o download sequencial sempre que a fila mudar
  }, [filesToDownload]); // Remova 'loadingFile' da dependência, pois já está sendo gerido pelo 'useRef'

  return (
    <DownloadContext.Provider
      value={{ addFileToDownloadQueue, filesToDownload, loadingFile, removeFileFromQueue }}
    >
      {children}
    </DownloadContext.Provider>
  );
};
