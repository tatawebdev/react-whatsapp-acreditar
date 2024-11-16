import React, { createContext, useContext, useState, useEffect } from "react";
import { getImage } from "../../services/chatService";
import { saveImageToCache } from "../../utils/cacheService";

const DownloadContext = createContext();

export const useDownloadContext = () => {
  return useContext(DownloadContext);
};

export const DownloadProvider = ({ children }) => {
  const [filesToDownload, setFilesToDownload] = useState([]);
  const [loadingFile, setLoadingFile] = useState(false);

  const addFileToDownload = (props) => {
    const fileExists = filesToDownload.some(
      (file) => file?.context === props?.context
    );

    if (!fileExists) {
      setFilesToDownload((prevFiles) => [
        ...prevFiles,
        { ...props, loading: true },
      ]);
    }
  };

  const removeFileFromQueue = (id) => {
    setFilesToDownload((prevFiles) =>
      prevFiles.filter((file) => file.id !== id)
    );
  };

  const handleDownloadQueue = async () => {
    if (filesToDownload.length > 0 && !loadingFile) {
      const nextFile = filesToDownload[0];
      setLoadingFile(true);

      try {
        const response = await getImage(nextFile.content);
        if (!response?.error) {

          saveImageToCache(nextFile.content, response)
        }
        removeFileFromQueue(nextFile.id);
      } catch (error) {
        console.error("Erro no processamento:", error);
      } finally {
        setLoadingFile(false);
      }
    }
  };

  useEffect(() => {
    if (filesToDownload.length > 0 && !loadingFile) {
      handleDownloadQueue();
    }
  }, [filesToDownload]);
  return (
    <DownloadContext.Provider value={{ addFileToDownload }}>
      {children}
    </DownloadContext.Provider>
  );
};
