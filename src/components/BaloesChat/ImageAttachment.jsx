import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa'; // Importando o ícone de "X" do react-icons

export default function ImageAttachment(props) {
  const { fileby_content } = props;


  const [isFullScreen, setIsFullScreen] = useState(false);

  const handleFullScreen = () => {
    setIsFullScreen(true);
  };

  const handleCloseFullScreen = () => {
    setIsFullScreen(false);
  };

  return (
    <>
      <div className="group relative mt-2">
        <div className="absolute w-[350px] h-full bg-gray-900/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
          <button
            data-tooltip-target="download-image"
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
              <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
            </svg>
          </button>
          <div
            id="download-image"
            role="tooltip"
            className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
          >
            Download image
            <div className="tooltip-arrow" data-popper-arrow></div>
          </div>
        </div>
        <img src= {fileby_content?.file_src ?? "https://flowbite.com/docs/images/blog/image-2.jpg"} className="rounded-lg w-[350px]" />
      </div>

      {isFullScreen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center"
          onClick={handleCloseFullScreen}
        >          <button
          className="absolute top-5 right-5 text-white text-3xl focus:outline-none"
          onClick={handleCloseFullScreen}
        >
            <FaTimes /> {/* Ícone de "X" para fechar */}
          </button>
          <img
            src="https://flowbite.com/docs/images/blog/image-2.jpg"
            className="rounded-lg max-w-full max-h-full z-50"
            alt="Full Screen"
          />
        </div>
      )}
    </>
  );
}
