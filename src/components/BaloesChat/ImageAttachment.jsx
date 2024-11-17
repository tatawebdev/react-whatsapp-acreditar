import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa"; // Importando o ícone de "X" do react-icons
import PropTypes from "prop-types";
import ChatBalloon from "./ChatBalloon";
import { getResourcebyFileID } from "../../services/chatService";

export default function ImageAttachment(props) {
  const { content, fileby_content, sent_by_user } = props;

  const [isFullScreen, setIsFullScreen] = useState(false);
  const [image, setImage] = useState(null); // Estado para armazenar a imagem em base64

  useEffect(() => {
    const loadImage = async () => {
      try {
        const base64Image = await getResourcebyFileID(content);
        setImage(base64Image);
      } catch (error) {
        console.error("Erro ao carregar a imagem:", error);
      }
    };

    if (sent_by_user && !fileby_content?.file_url && content) {
      loadImage();
    } else if (!sent_by_user) {
      setImage(fileby_content?.file_url);
    }
  }, [sent_by_user, fileby_content, content]);

  const handleFullScreen = () => setIsFullScreen(true);
  const handleCloseFullScreen = () => setIsFullScreen(false);
  const alignmentClass = !!sent_by_user ? "justify-start" : "justify-end";

  return (
    <>
      {/* <ChatBalloon {...props}> */}
      <div className={`flex items-start gap-2.5 ${alignmentClass}`}>
        <div className="group relative mt-2">
          <div className="absolute w-[350px] h-full bg-gray-900/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
            <button
              aria-label="Ver imagem em tela cheia"
              className="inline-flex items-center justify-center rounded-full h-10 w-10 bg-white/30 hover:bg-white/50 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50"
              onClick={handleFullScreen}
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
            src={image || "https://flowbite.com/docs/images/blog/image-2.jpg"} // Exibe a imagem em base64 ou uma imagem padrão
            className="rounded-lg w-[350px]"
            alt="Preview da imagem"
            loading="lazy"
          />
        </div>

        {isFullScreen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
            onClick={handleCloseFullScreen}
            aria-label="Fechar imagem em tela cheia"
          >
            <button
              className="absolute top-5 right-5 text-white text-3xl focus:outline-none"
              onClick={handleCloseFullScreen}
              aria-label="Fechar"
            >
              <FaTimes />
            </button>
            <img
              src={image || "https://flowbite.com/docs/images/blog/image-2.jpg"} // Exibe a imagem em base64 ou uma imagem padrão
              className="rounded-lg max-w-full max-h-full"
              alt="Imagem em tela cheia"
            />
          </div>
        )}
      </div>

      {/* </ChatBalloon> */}
    </>
  );
}

// Validação das props com PropTypes
ImageAttachment.propTypes = {
  content: PropTypes.string,
  fileby_content: PropTypes.shape({
    file_url: PropTypes.string,
  }),
  sent_by_user: PropTypes.bool.isRequired,
};
