import React, { useState } from "react";
import { getImage } from "../../../services/chatService";
import { useDownloadContext } from "../../../context/images/DownloadContext";

const FullScreenButton = ({ onClick }) => {
  return (
    <button
      data-tooltip-target="download-image"
      className="inline-flex items-center justify-center rounded-full h-10 w-10 bg-white/30 hover:bg-white/50 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50"
      onClick={onClick}
    >
      <svg
        className="w-5 h-5 text-white"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M1.5 12s3.5-7 10.5-7 10.5 7 10.5 7-3.5 7-10.5 7S1.5 12 1.5 12z"
        />
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
      </svg>
    </button>
  );
};

const DownloadButton = ({ fileID, loading, srcimage, setSrcImage }) => {
  const { addFileToDownloadQueue } = useDownloadContext();
  const [loadingManual, setLoadingManual] = useState(false);

  const handleDownload = async () => {
    try {
      setLoadingManual(true);
      addFileToDownloadQueue(fileID);
    } catch (error) {
      console.error("Erro ao obter imagem:", error);
    } finally {
      setLoadingManual(false);
    }
  };

  return (
    <button
      data-tooltip-target="download-image"
      className={`inline-flex items-center justify-center rounded-full h-10 w-10 bg-white/30 hover:bg-white/50 dark:text-white ${loadingManual || loading ? "animate-spin ring-4 outline-none ring-gray-50" : ""}`}
      onClick={handleDownload}
    >
      {loadingManual || loading ? (
        <svg
          className="w-5 h-5 text-white animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" strokeDasharray="100" strokeDashoffset="80" />
        </svg>
      ) : (
        <svg
          className="w-5 h-5 text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 16 18"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8 1v11m0 0 4-4m-4 4L4 8m11 4v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3"
          />
        </svg>
      )}
    </button>
  );
};

export { DownloadButton, FullScreenButton };
