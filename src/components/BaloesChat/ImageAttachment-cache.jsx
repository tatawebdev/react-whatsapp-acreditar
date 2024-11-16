import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useFullScreen } from "../../context/images/FullScreenContext";
import { DownloadButton } from "./images/FullScreenButton";
import { useDownloadContext } from "../../context/images/DownloadContext";
import { loadImageFromCache, saveImageToCache } from "../../utils/cacheService";

export default function ImageAttachment(props) {
  const { isFullScreen, handleFullScreen, handleCloseFullScreen } = useFullScreen();
  const { fileby_content, content, cacheEnabled = true } = props; // Adiciona cacheEnabled como prop
  const {
    addFileToDownloadQueue,
    filesToDownload,
    loadingFile,
    removeFileFromQueue,
  } = useDownloadContext();

  const [srcImage, setSrcImage] = useState(fileby_content?.file_url);
  const [fileAdded, setFileAdded] = useState(false);

  const srcImagePadrao = "https://flowbite.com/docs/images/blog/image-2.jpg";
  const download = !srcImage;

  useEffect(() => {
    const cachedImage = loadImageFromCache(content);
    if (cachedImage) {
      setSrcImage(cachedImage);
    } else if (
      !srcImage &&
      !filesToDownload.some((file) => file.fileID === content) &&
      !fileAdded
    ) {
      addFileToDownloadQueue(content);
      setFileAdded(true);
    }
  }, [content, srcImage, filesToDownload, addFileToDownloadQueue, fileAdded, cacheEnabled]);

  useEffect(() => {
    if (!srcImage && download && filesToDownload.length) {
      const currentFile = filesToDownload.find(
        (file) => file.fileID === content && file?.loading
      );

      if (currentFile) {
        if (currentFile.fileUrl) {
          setSrcImage(currentFile.fileUrl);
          saveImageToCache(content, currentFile.fileUrl);
          removeFileFromQueue();
        }
      }
    }
  }, [loadingFile, srcImage, download, filesToDownload, content, removeFileFromQueue]);

  return (
    <>
      <div className="group relative mt-2">
        <div
          onClick={!download ? handleFullScreen : null}
          className={`absolute w-[350px] h-full bg-gray-900/50 ${download ? "opacity-100" : "opacity-0"} transition-opacity duration-300 rounded-lg flex items-center justify-center ${!download ? "cursor-pointer" : ""}`}
        >
          {!!download && (
            <DownloadButton
              fileID={content}
              loading={!fileby_content?.file_url && loadingFile}
              srcimage={srcImage}
              setSrcImage={setSrcImage}
            />
          )}
        </div>
        <img
          src={srcImage ?? srcImagePadrao}
          className="rounded-lg w-[350px]"
          alt="Imagem"
        />
      </div>

      {isFullScreen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center"
          onClick={handleCloseFullScreen}
        >
          <button
            className="absolute top-5 right-5 text-white text-3xl focus:outline-none"
            onClick={handleCloseFullScreen}
          >
            <FaTimes />
          </button>
          <img
            src={srcImage ?? srcImagePadrao}
            className="rounded-lg max-w-full max-h-full z-50"
            alt="Full Screen"
          />
        </div>
      )}
    </>
  );
}
 