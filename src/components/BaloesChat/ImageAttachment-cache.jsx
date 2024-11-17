import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa"; // Importando o ícone de "X" do react-icons
import { getImage } from "../../services/chatService";
import { useDownloadContext } from "../../context/images/DownloadContext";
import { loadImageFromCache, saveImageToCache } from "../../utils/cacheService";

export default function ImageAttachment(props) {
  const { content, fileby_content } = props;

  const [fileAdded, setFileAdded] = useState(false);
  const [image, setImage] = useState(fileby_content?.file_url);
  const { addFileToDownload, imgSrc } = useDownloadContext();

  
  useEffect(() => {
    if (!image) {
      setFileAdded(true);
      addFileToDownload(props);
    }
  }, []);

  return (
    <>
      <div className="group relative mt-2">
        <div className="absolute w-[350px] h-full bg-gray-900/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
          <button
            data-tooltip-target="download-image"
            className="inline-flex items-center justify-center rounded-full h-10 w-10 bg-white/30 hover:bg-white/50 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50"
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
              <circle
                cx="12"
                cy="12"
                r="3"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          </button>
        </div>
        <img
          src={fileby_content?.file_url || "https://flowbite.com/docs/images/blog/image-2.jpg"} // Exibe a imagem em base64 ou uma imagem padrão
          className="rounded-lg w-[350px]"
          alt="Preview"
        />
      </div>
    </>
  );
}
